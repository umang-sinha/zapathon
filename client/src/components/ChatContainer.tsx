import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import ChatHeader from "./ChatHeader";
import ChatMessage, { MessageType } from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add dummy bot response
      const botMessage: MessageType = {
        id: uuidv4(),
        content: generateDummyResponse(content),
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

  const generateDummyResponse = (userInput: string): string => {
    const responses = [
      `I understand you're asking about "${userInput}". As an AI assistant, I'm here to help with that.`,
      `Thanks for your message: "${userInput}". This is a simulated response for your hackathon project.`,
      `You said: "${userInput}". When you integrate the API, you'll see real responses here.`,
      `Regarding "${userInput}" - this is a placeholder response. Your actual AI integration will provide more helpful answers.`,
      `I see you're interested in "${userInput}". This is a dummy response, but you can replace it with API calls later.`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const introMessage: MessageType = {
    id: "intro",
    content:
      "Hi there! 👋 I'm your Sales AI assistant. How can I help you today?",
    isUser: false,
  };

  const displayMessages = messages.length > 0 ? messages : [introMessage];

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <ChatHeader onNewChat={handleNewChat} />

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
