export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export interface ChatResponse {
  success: boolean;
  botReply?: string;
  suggestedReplies?: string[];
  message?: string;
}