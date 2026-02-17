import { MessageType } from "@/app/types";
import { AlertCircle, Sparkles, Cpu } from "lucide-react";

interface MessageProps {
  message: MessageType;
}

const ChatMessage = ({ message }: MessageProps) => {
  if (message.type === "user") {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="chat-bubble-user px-4 sm:px-5 py-2 sm:py-3 max-w-[90%] sm:max-w-[85%] md:max-w-[70%]">
          <p className="whitespace-pre-wrap text-xs sm:text-sm md:text-base break-words">{message.content}</p>
        </div>
      </div>
    );
  }

  if (message.type === "ai" && message.modal) {
    return (
      <div className="space-y-3 animate-fade-in">
        <ModelCard
          modelName={message.modal}
          icon={<Sparkles className="w-4 h-4" />}
          answer={message.content}
          error={message.error}
          variant={message.modal}
        />
        
      </div>
    );
  }

  return (
    <div className="flex animate-fade-in">
      <div className="chat-bubble-ai px-4 sm:px-5 py-2 sm:py-3 max-w-[90%] sm:max-w-[85%] md:max-w-[70%]">
        <p className="whitespace-pre-wrap text-xs sm:text-sm md:text-base text-foreground break-words">
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
  variant: string;
}

const SkeletonLoader = () => (
  <div className="space-y-2">
    <div className="h-3 bg-gradient-to-r from-background/50 to-background/30 rounded animate-pulse"></div>
    <div className="h-3 bg-gradient-to-r from-background/50 to-background/30 rounded animate-pulse"></div>
    <div className="h-3 bg-gradient-to-r from-background/40 to-background/20 rounded animate-pulse w-3/4"></div>
  </div>
);

const ModelCard = ({ modelName, icon, answer, error, variant }: ModelCardProps) => {
  const cardClass = variant === "gemini" ? "model-card-gemini" : "model-card-openai";
  const textColor = variant === "gemini" ? "text-gemini" : "text-openai";

  return (
    <div className={`glass-card ${cardClass} p-3 sm:p-4 rounded-lg sm:rounded-xl animate-scale-in`}>
      <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
        <span className={textColor}>{icon}</span>
        <span className={`font-semibold text-xs sm:text-sm ${textColor}`}>{modelName}</span>
        {variant === "gemini" && (
          <span className="px-2 py-0.5 rounded-full bg-gemini/20 text-gemini text-xs font-medium whitespace-nowrap">
            Flash
          </span>
        )}
        {variant === "openai" && (
          <span className="px-2 py-0.5 rounded-full bg-openai/20 text-openai text-xs font-medium whitespace-nowrap">
            Mini
          </span>
        )}
      </div>
      
      {error ? (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm break-words">{error}</span>
        </div>
      ) : answer === "" ? (
        <div className="font-mono text-xs sm:text-sm md:text-base text-foreground bg-background/50 rounded-lg p-2 sm:p-3 overflow-x-auto">
          <SkeletonLoader />
        </div>
      ) : (
        <div className="font-mono text-xs sm:text-sm md:text-base text-foreground bg-background/50 rounded-lg p-2 sm:p-3 overflow-x-auto">
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
