import { MessageType } from "@/app/types";
import { AlertCircle, Sparkles, Cpu } from "lucide-react";

interface MessageProps {
  message: MessageType;
}

const ChatMessage = ({ message }: MessageProps) => {
  if (message.type === "user") {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="chat-bubble-user px-5 py-3 max-w-[85%] md:max-w-[70%]">
          <p className="whitespace-pre-wrap text-sm md:text-base">{message.content}</p>
        </div>
      </div>
    );
  }

  if (message.responses) {
    return (
      <div className="space-y-3 animate-fade-in">
        <ModelCard
          modelName="Gemini"
          icon={<Sparkles className="w-4 h-4" />}
          answer={message.responses.gemini.answer}
          error={message.responses.gemini.error}
          variant="gemini"
        />
        
        <ModelCard
          modelName="GPT-5"
          icon={<Cpu className="w-4 h-4" />}
          answer={message.responses.openai.answer}
          error={message.responses.openai.error}
          variant="openai"
        />
      </div>
    );
  }

  return (
    <div className="flex animate-fade-in">
      <div className="chat-bubble-ai px-5 py-3 max-w-[85%] md:max-w-[70%]">
        <p className="whitespace-pre-wrap text-sm md:text-base text-foreground">
          {message.content.split("**").map((part, i) =>
            i % 2 === 1 ? (
              <span key={i} className="font-semibold text-primary">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </p>
      </div>
    </div>
  );
};

interface ModelCardProps {
  modelName: string;
  icon: React.ReactNode;
  answer: string;
  error?: string;
  variant: "gemini" | "openai";
}

const ModelCard = ({ modelName, icon, answer, error, variant }: ModelCardProps) => {
  const cardClass = variant === "gemini" ? "model-card-gemini" : "model-card-openai";
  const textColor = variant === "gemini" ? "text-gemini" : "text-openai";

  return (
    <div className={`glass-card ${cardClass} p-4 rounded-xl animate-scale-in`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={textColor}>{icon}</span>
        <span className={`font-semibold text-sm ${textColor}`}>{modelName}</span>
        {variant === "gemini" && (
          <span className="px-2 py-0.5 rounded-full bg-gemini/20 text-gemini text-xs font-medium">
            Flash
          </span>
        )}
        {variant === "openai" && (
          <span className="px-2 py-0.5 rounded-full bg-openai/20 text-openai text-xs font-medium">
            Mini
          </span>
        )}
      </div>
      
      {error ? (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      ) : (
        <div className="font-mono text-sm md:text-base text-foreground bg-background/50 rounded-lg p-3">
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
