# QuizMind AI 🧠⚡  
### Multi-Model AI Quiz Answering Platform

The FastAPI backend has been migrated into the Next.js app. The quiz stream is available at `/api/answerQuiz` and the health check is available at `/api/health`.

For local development, copy `.env.example` to `.env.local` and add the existing `GROQ_API_KEY` and `GEMINI_API_KEY` values. Start the app with `npm run dev`; no separate Python server is required.

[Visit Website](https://answermyquiz.netlify.app/)


QuizFusion AI is a **full-stack AI-powered quiz answering web application** that allows users to instantly get **accurate, crisp answers** to quiz and exam questions by querying **multiple Large Language Models (LLMs) in parallel**.

The platform is designed as a **resume-grade AI system**, focusing on **AI orchestration, prompt engineering, and scalable backend architecture**, rather than just a simple chatbot.

---

## 🚀 Features

- 💬 **Chat-based quiz interface** (similar to ChatGPT)
- 🎯 **Subject-based contextual fine-tuning** (DBMS, DSA, OS, CN, SQL, etc.)
- 🤖 **Multi-model AI orchestration**
  - OpenAI (free-tier models)
  - Google Gemini (free-tier)
  - DeepSeek (via OpenRouter)
- ⚡ **Parallel AI requests** for faster responses
- 🧠 **Smart MCQ detection**
  - If options are present → returns **only the correct option**
  - If no options → returns a **crisp, direct answer**
- 🧩 **Model-wise response comparison**
- ❌ No authentication
- ❌ No database
- ❌ No user tracking
- ✅ Fully stateless and session-based

---

