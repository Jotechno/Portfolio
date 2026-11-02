"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Maximize2,
  Minimize2,
  AlertCircle,
  RefreshCw,
  User,
  Bot,
  MessageSquareText,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "¿Cuál es tu rol y experiencia actual?",
  "Háblame de los proyectos Encafeina2 y CosmeTIC",
  "¿Qué stacks Fullstack y herramientas de Soporte TI dominas?",
  "¿Qué certificaciones tienes y cómo puedo contactarte?",
];

const INITIAL_ASSISTANT_MESSAGE: ChatMessage = {
  id: "welcome-msg",
  role: "assistant",
  content: `¡Hola! soy **Sebastián**. Mediante este chat puedes preguntarme en tiempo real sobre mi experiencia como **Desarrollador Fullstack** y **Especialista de Soporte TI**, los sistemas empresariales que he construido, mis certificaciones o mi disponibilidad laboral.`,
  timestamp: "En línea",
};

/**
 * Clean lightweight formatter for headings, dividers, bold text (**...**) and lists
 */
function formatInlineSegments(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, partIdx) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={partIdx} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={partIdx}>{part}</React.Fragment>;
  });
}

function renderFormattedText(text: string) {
  const lines = text.split("\n");

  return lines.map((rawLine, lineIdx) => {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-1.5" />;
    }

    if (/^---+$/.test(trimmed)) {
      return <hr key={lineIdx} className="border-white/10 my-2" />;
    }

    if (/^#{1,4}\s+/.test(trimmed)) {
      const headingText = trimmed.replace(/^#{1,4}\s+/, "");
      return (
        <h4
          key={lineIdx}
          className="font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold text-cyan-300 pt-1.5 pb-0.5"
        >
          {formatInlineSegments(headingText)}
        </h4>
      );
    }

    const isBullet = /^[-*•]\s+/.test(trimmed);
    if (isBullet) {
      const cleanLine = trimmed.replace(/^[-*•]\s+/, "");
      return (
        <div key={lineIdx} className="flex items-start gap-2 pl-1 my-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2 shadow-[0_0_6px_#22d3ee]" />
          <span className="leading-relaxed">
            {formatInlineSegments(cleanLine)}
          </span>
        </div>
      );
    }

    const numberedMatch = trimmed.match(/^(\d+\.)\s+(.*)$/);
    if (numberedMatch) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 pl-0.5 my-1">
          <span className="font-semibold text-purple-300 shrink-0">
            {numberedMatch[1]}
          </span>
          <span className="leading-relaxed">
            {formatInlineSegments(numberedMatch[2])}
          </span>
        </div>
      );
    }

    return (
      <p key={lineIdx} className="leading-relaxed">
        {formatInlineSegments(rawLine)}
      </p>
    );
  });
}

function getCurrentTimeLabel(): string {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  } catch {
    return "";
  }
}

export default function DigitalTwinChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    INITIAL_ASSISTANT_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  const [interactionId, setInteractionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, error, isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Allow any button on the website to open the Digital Twin chat
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-digital-twin-chat", handleOpenEvent);
    return () =>
      window.removeEventListener("open-digital-twin-chat", handleOpenEvent);
  }, []);

  const sendMessage = async (promptText: string, isRetry = false) => {
    const trimmed = promptText.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setLastFailedPrompt(null);

    if (!isRetry) {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: getCurrentTimeLabel(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
    }

    setIsLoading(true);

    try {
      let response = await fetch("/Portfolio/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          previousInteractionId: interactionId,
        }),
      }).catch(() => null);

      if (!response || !response.ok) {
        const localAttempt = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmed,
            previousInteractionId: interactionId,
          }),
        }).catch(() => null);

        if (localAttempt) {
          response = localAttempt;
        }
      }

      if (!response) {
        throw new Error(
          "El asistente con Gemini API requiere un entorno con servidor activo (Node.js/Vercel). En este despliegue estático puedes escribirme directamente por WhatsApp o correo."
        );
      }

      let data: {
        ok?: boolean;
        reply?: string;
        interactionId?: string | null;
        error?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "No se recibió una respuesta válida del servidor. Intenta nuevamente."
        );
      }

      if (!response.ok || !data.ok || !data.reply) {
        setError(
          data.error ||
            "No fue posible obtener respuesta de mi Gemelo Digital en este momento."
        );
        setLastFailedPrompt(trimmed);
        return;
      }

      if (data.interactionId) {
        setInteractionId(data.interactionId);
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: getCurrentTimeLabel(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setError(
        "Error de conexión al consultar el asistente de IA. Verifica tu red e intenta nuevamente."
      );
      setLastFailedPrompt(trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_ASSISTANT_MESSAGE]);
    setInteractionId(null);
    setError(null);
    setLastFailedPrompt(null);
    setInput("");
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir chat con el Gemelo Digital de Juan Sebastián"
            className="group relative flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#0d1126] via-[#13112e] to-[#0c162c] border border-purple-500/50 hover:border-cyan-400/80 shadow-[0_0_32px_rgba(139,92,246,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.55)] transition-all duration-300 cursor-pointer"
          >
            {/* Ambient Neon Glow Ring */}
            <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_18px_rgba(168,85,247,0.6)]">
              <MessageSquareText className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border border-[#05060b]" />
              </span>
            </span>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-[family-name:var(--font-display)] text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                  ChatBot con IA
                </span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <p className="text-[11px] text-slate-300">
                Pregúntame sobre mi perfil
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Backdrop when Expanded into Modal */}
      {isOpen && isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-opacity"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Chat Window (Floating Panel or Expanded Modal) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat interactivo Gemelo Digital de Juan Sebastián Tamayo Toro"
          className={`fixed z-[60] flex flex-col overflow-hidden rounded-2xl bg-[#070a15]/95 backdrop-blur-2xl border border-purple-500/45 shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_45px_rgba(139,92,246,0.3)] transition-all duration-300 ${
            isExpanded
              ? "inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[740px] sm:h-[82vh] max-h-[860px]"
              : "bottom-4 right-4 left-4 sm:left-auto sm:w-[420px] h-[78vh] max-h-[640px]"
          }`}
        >
          {/* Top Accent Neon Gradient Line */}
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 shrink-0" />

          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-[#0a0e1f]/95 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/35 via-blue-600/25 to-cyan-500/30 border border-purple-400/50 shrink-0">
                <Bot className="w-5 h-5 text-cyan-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0a0e1f] shadow-[0_0_8px_#34d399]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold text-white truncate">
                    Gordon · Asistente AI
                  </h3>
                </div>
                {/* <p className="text-[11px] text-purple-300 truncate">
                  Asistente oficial sobre mi trayectoria y proyectos
                </p> */}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reiniciar conversación"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                title={isExpanded ? "Tamaño compacto" : "Ampliar ventana"}
                className="hidden sm:inline-flex p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsExpanded(false);
                }}
                title="Cerrar chat"
                className="p-2 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-enterprise-subgrid">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                      isUser
                        ? "bg-blue-600/25 border-blue-400/40 text-blue-200"
                        : "bg-purple-600/25 border-purple-400/40 text-cyan-300"
                    }`}
                  >
                    {isUser ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs sm:text-sm space-y-1 ${
                      isUser
                        ? "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white rounded-tr-sm shadow-[0_6px_20px_rgba(139,92,246,0.3)]"
                        : "bg-[#0d1226]/95 border border-purple-500/30 text-slate-200 rounded-tl-sm shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
                    }`}
                  >
                    <div className="space-y-1">
                      {renderFormattedText(msg.content)}
                    </div>
                    {msg.timestamp && (
                      <span
                        className={`block text-[10px] pt-1 ${
                          isUser
                            ? "text-purple-100/75 text-right"
                            : "text-slate-400"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Quick Suggested Questions (shown when only welcome message exists) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider px-1">
                  Preguntas sugeridas:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="text-left px-3.5 py-2.5 rounded-xl bg-[#0c1124]/90 hover:bg-purple-600/20 border border-purple-500/25 hover:border-cyan-400/50 text-xs text-slate-200 hover:text-white transition-all cursor-pointer flex items-center justify-between gap-2"
                    >
                      <span>{q}</span>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing / Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600/25 border border-purple-400/40 text-cyan-300 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-[#0d1226]/95 border border-cyan-400/35 px-4 py-3 flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  </div>
                  <span className="text-xs text-cyan-200 font-medium">
                    Redactando respuesta...
                  </span>
                </div>
              </div>
            )}

            {/* Error State with Retry Button */}
            {error && (
              <div className="rounded-xl bg-rose-500/15 border border-rose-500/40 p-3.5 space-y-2.5 text-xs text-rose-100">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{error}</p>
                </div>
                {lastFailedPrompt && (
                  <button
                    type="button"
                    onClick={() => sendMessage(lastFailedPrompt, true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/25 hover:bg-rose-500/40 border border-rose-400/40 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reintentar pregunta</span>
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Composer */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3.5 bg-[#090d1c] border-t border-white/10 shrink-0 space-y-2"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Escribe una pregunta sobre mi experiencia o proyectos..."
                className="flex-1 max-h-28 min-h-[42px] resize-none px-3.5 py-2.5 rounded-xl bg-[#050811] border border-purple-500/30 focus:border-cyan-400/70 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Enviar pregunta"
                className="h-[42px] px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_18px_rgba(139,92,246,0.4)] transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Enviar</span>
              </button>
            </div>
            <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
              <span>Impulsado por Google Gemini</span>
              <span>Enter para enviar</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

