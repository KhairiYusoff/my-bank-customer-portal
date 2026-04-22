import React, { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  CircularProgress,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  ChatFab,
  ChatHeader,
  ChatWindow,
  InputRow,
  MessageBubble,
  MessagesContainer,
} from "./styles";
import { API_URL } from "@/config/env";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: `${API_URL}/ai/chat`,
      credentials: "include",
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;
    setInputValue("");
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {open && (
        <ChatWindow>
          <ChatHeader>
            <Typography variant="subtitle1" fontWeight={600}>
              MyBank Assistant
            </Typography>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "common.white" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </ChatHeader>

          <MessagesContainer>
            {messages.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 2 }}
              >
                Hi! How can I help you with your banking today?
              </Typography>
            )}
            {messages.map((m) => {
              const text = m.parts
                .filter((p) => p.type === "text")
                .map((p) => (p as { type: "text"; text: string }).text)
                .join("");
              return (
                <MessageBubble key={m.id} isUser={m.role === "user"}>
                  {text}
                </MessageBubble>
              );
            })}
            {error && (
              <Typography variant="caption" color="error" textAlign="center">
                Something went wrong. Please try again.
              </Typography>
            )}
            <div ref={bottomRef} />
          </MessagesContainer>

          <InputRow>
            <InputBase
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              disabled={isLoading}
              size="small"
              sx={{ fontSize: "0.875rem" }}
            />
            <Tooltip title="Send">
              <span>
                <IconButton
                  onClick={handleSend}
                  size="small"
                  disabled={isLoading || !inputValue.trim()}
                  color="primary"
                >
                  {isLoading ? (
                    <CircularProgress size={18} />
                  ) : (
                    <SendIcon fontSize="small" />
                  )}
                </IconButton>
              </span>
            </Tooltip>
          </InputRow>
        </ChatWindow>
      )}

      <Tooltip title="MyBank Assistant" placement="left">
        <ChatFab
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open AI chat"
        >
          <ChatIcon />
        </ChatFab>
      </Tooltip>
    </>
  );
};

export default ChatWidget;
