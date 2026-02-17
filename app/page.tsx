"use client"
import { ArrowRight, Brain, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";



const POPULAR_SUBJECTS: string[] = [
  "Technology & Programming",
  "Artificial Intelligence & Data",
  "Mathematics & Statistics",
  "Science",
  "Business & Economics",
  "Aptitude & Reasoning",
  "Humanities & Social Sciences",
  "Career & Interview Preparation",
  "Design & Creativity",
  "General Knowledge",
];


export default function Home() {
  const router = useRouter();

  const [subject,setSubject]=useState<string>("")

  const handleStart = () => {
    if (subject.trim()) {
      router.push(`/chats/${subject.trim().toLowerCase().replace(/\s+/g, "-")}`);
    }
  };
  

  const handleSubjectClick = (selectedSubject: string) => {
    setSubject(selectedSubject);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && subject.trim()) {
      handleStart();
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10 max-w-2xl w-full space-y-8 sm:space-y-12 animate-fade-in">
        {/* Logo & Title */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-2xl bg-primary/20 glow-ring">
              <Brain className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
            </div>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="gradient-text">QuizMind</span>{" "}
            <span className="text-foreground">AI</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-md mx-auto">
            Multi-model AI quiz answering system. Get answers from{" "}
            <span className="text-gemini font-medium">Gemini</span> and{" "}
            <span className="text-openai font-medium">GPT-5</span> side by side.
          </p>
        </div>

        {/* Subject Input */}
        <div className="space-y-6">
          <div className="glass-card p-2 input-glow">
            <div className="flex gap-2">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter subject (e.g., DSA, DBMS, React, SQL...)"
                className="flex-1 px-3 sm:px-4 py-3 sm:py-4 bg-transparent text-sm sm:text-base md:text-lg text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
                autoFocus
              />
              <button
                onClick={handleStart}
                disabled={!subject.trim()}
                className="btn-primary-glow px-4 cursor-pointer sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-1 sm:gap-2 flex-shrink-0"
              >
                <span className="hidden sm:inline">Start</span>
                <span className="sm:hidden">Go</span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Quick Select Subjects */}
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Popular subjects
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {POPULAR_SUBJECTS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSubjectClick(s)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs cursor-pointer sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${subject === s
                    ? "bg-primary text-primary-foreground"
                    : "glass-card hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8">
          <div className="glass-card p-3 sm:p-4 text-center space-y-2 hover:transition-transform hover:duration-300 hover:scale-105">
            <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto" />
            <h3 className="font-semibold text-xs sm:text-sm">Parallel Processing</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              Query multiple AI models simultaneously
            </p>
          </div>
          <div className="glass-card p-3 sm:p-4 text-center space-y-2 hover:transition-transform hover:duration-300 hover:scale-105">
            <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-accent mx-auto" />
            <h3 className="font-semibold text-xs sm:text-sm">Smart Formatting</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              MCQ detection with crisp answers
            </p>
          </div>
          <div className="glass-card p-3 sm:p-4 text-center space-y-2 hover:transition-transform hover:duration-300 hover:scale-105">
            <Brain className="w-5 sm:w-6 h-5 sm:h-6 text-gemini mx-auto" />
            <h3 className="font-semibold text-xs sm:text-sm">Model Comparison</h3>
            <p className="text-xs text-muted-foreground leading-tight">
              Compare Gemini vs GPT-5 responses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
