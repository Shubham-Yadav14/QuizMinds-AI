
import { useParams, useRouter,useSearchParams } from "next/navigation";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

export default function Header() {
    const router = useRouter();
    const { subject } = useParams() as {subject:string};
    const chat = subject
  ? subject.replace(/-/g, " ")
  : "";


  return (
    <header className="glass-card sticky top-0 z-50 border-b border-border/50 px-4 py-3 w-6xl mx-auto">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="font-display font-semibold text-lg">
              <span className="gradient-text">QuizMind</span> AI
            </h1>
            <p className="text-sm text-muted-foreground">
              Subject: <span className="text-primary font-medium capitalize">{chat}</span>
            </p>
          </div>
        </div>
      </header>
  )
}
