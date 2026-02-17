export type MessageType ={
    id: string;
    type: "user" | "ai";
    content: string;
    modal?:string;
    error?:string;
  }