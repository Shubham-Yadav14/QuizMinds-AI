
import { useParams, useRouter,useSearchParams } from "next/navigation";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

export default function Header() {
    const router = useRouter();
    const { subject } = useParams() as {subject:string};
    const chat = subject
  ? subject.replace(/-/g, " ")
  : "";


  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/50 px-3 sm:px-4 py-2 sm:py-3 w-full">
        <div className="max-w-4xl mx-auto flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="font-display font-semibold text-base sm:text-lg truncate">
              <span className="gradient-text">QuizMind</span> <span className="hidden sm:inline">AI</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              <span className="hidden sm:inline">Subject: </span><span className="text-primary font-medium capitalize">{chat}</span>
            </p>
          </div>
        </div>
      </header>
  )
}
