import { NextRequest, NextResponse } from "next/server";

type QuizRequest = {
  subject?: unknown;
  question?: unknown;
};

type ModelPayload = {
  model: string;
  answer: string;
  error?: string;
};

const RATE_LIMIT = 9;
const RATE_WINDOW_MS = 60_000;
const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => timestamp > now - RATE_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function buildSystemPrompt(subject: string) {
  return `You are an AI quiz answering system.

Context:
Subject: ${subject}

Rules:
1. If the question contains multiple-choice options (A, B, C, D, etc):
   - Return ONLY the correct option (e.g., "C) MongoDB")
   - No explanation
   - No extra text

2. If the question has NO options:
   - Return a crisp, direct answer
   - Maximum 2-3 lines

3. Be accurate, fast, and concise.
4. Prioritize correctness over verbosity.`;
}

async function callOpenAI(systemPrompt: string, question: string): Promise<ModelPayload> {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL ?? "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      return { model: "openai", answer: "", error: await response.text() };
    }

    const data = await response.json();
    return {
      model: "openai",
      answer: data.choices[0].message.content.trim(),
    };
  } catch (error) {
    return { model: "openai", answer: "", error: String(error) };
  }
}

async function callGemini(systemPrompt: string, question: string): Promise<ModelPayload> {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent" +
        `?key=${encodeURIComponent(process.env.GEMINI_API_KEY ?? "")}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nQuestion:\n${question}` }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 400,
          },
        }),
        signal: AbortSignal.timeout(20_000),
      },
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    return {
      model: "Gemini",
      answer: data.candidates[0].content.parts[0].text,
    };
  } catch (error) {
    return { model: "Gemini", answer: "", error: String(error) };
  }
}

function formatEvent(event: string, payload: ModelPayload | Record<string, never>) {
  return `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
}

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { detail: "Too many requests - rate limit exceeded" },
      { status: 429 },
    );
  }

  let body: QuizRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.subject !== "string" || typeof body.question !== "string" || !body.subject || !body.question) {
    return NextResponse.json(
      { detail: "Subject and question are required" },
      { status: 400 },
    );
  }

  const subject = body.subject;
  const question = body.question;
  const systemPrompt = buildSystemPrompt(subject);
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      type PendingResult = { event: string; payload: ModelPayload };
      const pending: Promise<PendingResult>[] = [
        callGemini(systemPrompt, question).then((payload) => ({ event: "gemini", payload })),
        callOpenAI(systemPrompt, question).then((payload) => ({ event: "openai", payload })),
      ];

      try {
        while (pending.length > 0) {
          const result = await Promise.race(
            pending.map(async (promise, index) => ({ index, result: await promise })),
          );
          pending.splice(result.index, 1);
          const payload = result.result;
          controller.enqueue(encoder.encode(formatEvent(payload.event, payload.payload)));
        }
        controller.enqueue(encoder.encode(formatEvent("done", {})));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    },
  });
}