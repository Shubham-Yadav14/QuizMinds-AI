'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { MessageType } from '@/app/types';
import {useParams} from "next/navigation"



type MessageContextType = {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const {subject} = useParams() as {subject:string};
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chat= subject
    ? decodeURIComponent(subject).split("-")
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ")
    : "";

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        type: "ai",
        content: `Ready to answer questions about **${chat}**. Paste your quiz question below!`,
        modal:""
      }
    ])
  }, [chat])

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within MessageProvider');
  }
  return context;
};
