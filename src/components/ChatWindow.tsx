import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "../types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
}

function ChatWindow({ messages }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const visibleMessages = messages.filter(
    (message) => message.text !== "__typing__"
  );

  const showHints = visibleMessages.length <= 2;

  return (
    <div className="chat-window">
      <div className="chat-window-inner">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {showHints && (
          <div className="chat-hint-card">
            <p className="chat-hint-title">Puedes empezar con algo como:</p>

            <div className="chat-hint-list">
              <span>Quiero una bebida refrescante</span>
              <span>¿Qué snack me recomiendas?</span>
              <span>Busco algo económico</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default ChatWindow;