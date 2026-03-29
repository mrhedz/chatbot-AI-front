import type { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const isTyping = message.text === "__typing__";

  return (
    <div className={`message-row ${isUser ? "user" : "bot"}`}>
      {!isUser && <div className={`bot-avatar ${isTyping ? "bot-avatar-glow" : ""}`}>AI</div>}

      <div
        className={`message-bubble ${isUser ? "user" : "bot"} ${
          isTyping ? "typing" : ""
        }`}
      >
        {isTyping ? (
          <div className="typing-dots" aria-label="Escribiendo">
            <span />
            <span />
            <span />
          </div>
        ) : (
          message.text
        )}
      </div>
    </div>
  );
}

export default MessageBubble;