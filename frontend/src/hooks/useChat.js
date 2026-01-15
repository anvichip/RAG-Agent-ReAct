import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../services/api";

export default function useChat() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi 👋 Upload a PDF and ask me anything about it.",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // auto scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text || !text.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await sendChatMessage(text.trim());

      const assistantMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: res?.answer ?? "No response from backend.",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const assistantMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "⚠️ Error talking to backend. Please check the API server and CORS.",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    messagesEndRef,
  };
}