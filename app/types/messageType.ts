export type MessageType ={
    id: string;
    type: "user" | "ai";
    content: string;
    responses?: {
      gemini: { answer: string; error?: string };
      openai: { answer: string; error?: string };
    };
    timestamp: Date;
  }