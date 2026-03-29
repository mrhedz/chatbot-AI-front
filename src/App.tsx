import { useMemo, useState } from "react";
import axios from "axios";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import type { ChatMessage, ChatResponse } from "./types/chat";

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = "portfolio-user-ia";

const INITIAL_QUICK_ACTIONS = [
  "Quiero una bebida refrescante",
  "Muéstrame snacks",
  "¿Qué me recomiendas?",
  "Busco algo económico",
];

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      text: "Hola, soy tu asistente inteligente de ventas.",
      sender: "bot",
    },
    {
      id: crypto.randomUUID(),
      text: "Puedo ayudarte a descubrir productos, comparar opciones y recomendar alternativas según lo que buscas.",
      sender: "bot",
    },
  ]);

  const [quickActions, setQuickActions] = useState<string[]>(
    INITIAL_QUICK_ACTIONS
  );
  const [isLoading, setIsLoading] = useState(false);

  const visibleMessages = useMemo(() => {
    if (!isLoading) {
      return messages;
    }

    return [
      ...messages,
      {
        id: "typing-indicator",
        text: "__typing__",
        sender: "bot" as const,
      },
    ];
  }, [messages, isLoading]);

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: message,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post<ChatResponse>(
        API_URL,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            "x-user-id": USER_ID,
          },
        }
      );

      const botReply =
        response.data?.botReply ||
        "No pude generar una respuesta en este momento.";

      const suggestedReplies =
        response.data?.suggestedReplies?.length
          ? response.data.suggestedReplies
          : INITIAL_QUICK_ACTIONS;

      await new Promise((resolve) => setTimeout(resolve, 650));

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: botReply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
      setQuickActions(suggestedReplies);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 450));

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: "Ocurrió un problema al conectar con el asistente inteligente.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
      setQuickActions(INITIAL_QUICK_ACTIONS);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="app-container">
      <section className="premium-shell">
        <aside className="premium-sidebar">
          <div className="premium-sidebar-top">
            <span className="premium-badge">AI Assistant</span>

            <h1>Chatbot Inteligente para Ventas</h1>

            <p className="premium-description">
              Una experiencia conversacional premium pensada para recomendar
              productos, resolver dudas y guiar decisiones de compra con un
              enfoque mucho más natural y persuasivo.
            </p>
          </div>

          <div className="premium-feature-list">
            <div className="premium-feature-card">
              <span className="feature-label">Modo</span>
              <strong>Conversacional</strong>
            </div>

            <div className="premium-feature-card">
              <span className="feature-label">Experiencia</span>
              <strong>UX premium</strong>
            </div>

            <div className="premium-feature-card">
              <span className="feature-label">Respuesta</span>
              <strong>Asistida por IA</strong>
            </div>
          </div>
        </aside>

        <section className="premium-chat-card">
          <div className="chat-topbar">
            <div className="chat-topbar-status">
              <span className="status-dot" />
              <span>Asistente activo</span>
            </div>

            <div className="chat-topbar-copy">
              Recomendaciones, comparativas y respuestas inteligentes
            </div>
          </div>

          <ChatWindow messages={visibleMessages} />
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            quickActions={quickActions}
          />
        </section>
      </section>
    </main>
  );
}

export default App;