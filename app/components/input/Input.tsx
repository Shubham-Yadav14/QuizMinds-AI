import { Loader2, Send } from 'lucide-react';
import React, { Dispatch, RefObject, SetStateAction } from 'react'

interface InputProps{
    input:string;
    setInput:Dispatch<SetStateAction<string>>;
    isLoading:boolean
    handleSubmit:()=>void;
    inputRef:RefObject<HTMLTextAreaElement|null>,
}

function Input({input,setInput,isLoading,handleSubmit,inputRef}:InputProps) {


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      };


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-linear-to-t from-background via-background to-transparent pt-6 sm:pt-8 pb-4 sm:pb-6 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-2 input-glow">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste your quiz question here..."
                rows={1}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none min-h-[44px] sm:min-h-[48px] max-h-32"
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className="btn-primary-glow p-2 sm:p-3 rounded-lg sm:rounded-xl text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none self-end flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                )}
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2 sm:mt-3 px-2">
            Press <kbd className="px-1 sm:px-1.5 py-0.5 rounded bg-secondary text-xs">Enter</kbd> to send, 
            <kbd className="px-1 sm:px-1.5 py-0.5 rounded bg-secondary text-xs ml-1">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
  )
}

export default Input
