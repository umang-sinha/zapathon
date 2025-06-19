import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { jsPDF } from "jspdf";

import ChatHeader from "./ChatHeader";
import ChatMessage, { MessageType } from "./ChatMessage";
import ChatInput from "./ChatInput";

// const exampleMDResponse = `
// # Welcome to My Page

// This is a paragraph with **bold text**, *italic text*, and a [link](https://example.com).

// ## Features

// 1. Easy to use
// 2. Fast rendering
// `;

const introMessage: MessageType = {
  id: "intro",
  content:
    "Hi there! 👋 I'm your Sales AI assistant. How can I help you today?",
  isUser: false,
};

const ChatContainer = () => {
  const userId = uuidv4()
  console.log({userId})
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const displayMessages = messages.length > 0 ? messages : [introMessage];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: uuidv4(),
      content,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3001/process?query=${content}&userId=${userId}`
      );

      console.log(response);

      // Add bot response
      const botMessage: MessageType = {
        id: uuidv4(),
        content: response.data.response,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const exportTextArrayToPDF = function () {
    console.log("Exporting to PDF...");

    const doc = new jsPDF();

    const margin = 10;
    const maxLineWidth = 180;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);

    const textArray = messages.map((message) => {
      return message.isUser
        ? `User: ${message.content}`
        : `Response: ${message.content}`;
    });

    let y = margin;

    textArray.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph, maxLineWidth);
      const blockHeight = lines.length * lineHeight;

      if (y + blockHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.text(lines, margin, y);
      y += blockHeight + 4; // spacing after each paragraph
    });

    doc.save("texts.pdf");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <ChatHeader
        onNewChat={handleNewChat}
        exportTextArrayToPDF={exportTextArrayToPDF}
      />

      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-4xl">
          {displayMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center justify-start gap-2 p-4">
              <div
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatContainer;
