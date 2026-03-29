import { useEffect, useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  quickActions: string[];
}

function ChatInput({
  onSendMessage,
  isLoading,
  quickActions,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoading) {
      setMessage("");
    }
  }, [isLoading]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  const handleQuickAction = (value: string) => {
    if (isLoading) {
      return;
    }

    onSendMessage(value);
  };

  return (
    <div className="chat-input-wrapper">
      <div className="quick-actions-header">
        <span className="quick-actions-label">Sugerencias rápidas</span>
      </div>

      <div className="quick-actions">
        {quickActions.map((action) => (
          <button
            key={action}
            type="button"
            className="quick-action-button"
            onClick={() => handleQuickAction(action)}
            disabled={isLoading}
          >
            {action}
          </button>
        ))}
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Pregúntame por productos, recomendaciones o comparativas..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={isLoading}
        />

        <button type="submit" className="chat-button" disabled={isLoading}>
          {isLoading ? "Pensando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default ChatInput;