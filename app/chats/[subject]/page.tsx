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
      timestamp: new Date(),
    };

    setMessages((prevData: MessageType[]) => [...prevData, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await ChatServices.AskQuiz(chat, input);
      if(result.gemini && result.openai){
        setMessages((prevData) => [
        ...prevData,
        {
          id: input,
          type: "ai",
          content: "",
          responses: {
            gemini: { answer: result.gemini.answer },
            openai: { answer: result.openai.answer },
          },
          timestamp: new Date(),
        },
      ]);
      }
      

    } catch (error: any) {
      console.log("Error fetching question response", error);
    } finally {
      setIsLoading(false);
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
          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="glass-card p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-muted-foreground text-sm">Querying AI models...</span>
                </div>
              </div>
            </div>
          )}
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
