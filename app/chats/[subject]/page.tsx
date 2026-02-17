"use client";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import Header from "@/app/components/headers/Header";

import ChatMessage from "@/app/components/chats/ChatMessage";
import Input from "@/app/components/input/Input";

import { useMessage } from "@/app/contexts";

import { MessageType } from "@/app/types";
import { ChatServices } from "@/app/services/chatServices";
import { useParams } from "next/navigation";

export default function page() {
  const { messages, setMessages } = useMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { subject } = useParams() as { subject: string };
  const chat = subject ? subject.replace(/-/g, " ") : "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage: MessageType = {
    id: `user-${Date.now()}`,
    type: "user",
    content: input.trim(),
  };

  const prevInput = input;
  const timestamp = Date.now();

  setInput("");
  setIsLoading(true);

  // Create message IDs for each model
  const aiMessageIds: Record<string, string> = {
    openai: `ai-openai-${timestamp}`,
    gemini: `ai-gemini-${timestamp}`,
  };

  const createAiMessage = (modal: string): MessageType => ({
    id: aiMessageIds[modal],
    type: "ai",
    content: "",
    modal: modal,
    error: undefined,
  });

  // Create all messages at once (user + both AI models)
  setMessages((prev) => [
    ...prev,
    userMessage,
    createAiMessage("openai"),
    createAiMessage("gemini"),
  ]);

  try {
    await ChatServices.AnswerStream(chat, prevInput, (data: any) => {
      const { event, model, answer, error } = data;

      if (event === "done") {
        setIsLoading(false);
        inputRef.current?.focus();
        return;
      }

      // Update the specific model's message
      if (event === "openai" || event === "gemini") {
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => {
            if (msg.id !== aiMessageIds[event]) return msg;

            return {
              ...msg,
              content: answer ?? msg.content,
              error: error ?? msg.error,
            };
          });
        });
      }
    });
  } catch (err: any) {
    console.error("Error:", err);
    setIsLoading(false);

    const errorMsg = err.message || "An error occurred while processing your request";
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === aiMessageIds.openai || msg.id === aiMessageIds.gemini) {
          return {
            ...msg,
            error: errorMsg,
          };
        }
        return msg;
      })
    );

    inputRef.current?.focus();
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 overflow-y-auto pb-40 sm:pb-44">
        <div className="w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-4xl">
          {messages.map((message: MessageType) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <Input
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
      />
    </div>
  );
}
