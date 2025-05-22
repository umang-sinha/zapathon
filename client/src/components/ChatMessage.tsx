export type MessageType = {
  id: string;
  content: string;
  isUser: boolean;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { content, isUser } = message;

  return (
    <div
      className={`flex w-full items-start gap-4 py-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Bot Messages */}
      {!isUser && (
        <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 p-1 shadow-lg shadow-purple-500/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M20.8 18.4A10.83 10.83 0 0 0 22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10c2.3 0 4.4-.7 6.1-1.9" />
            <path d="M9 11h6" />
            <path d="M11 15h2" />
          </svg>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-lg p-4 backdrop-blur-sm shadow-lg ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
            : "bg-gray-800/80 border border-gray-700/50 text-gray-100"
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>

      {/* User Messages */}
      {isUser && (
        <div className="h-8 w-8 rounded-md bg-gray-700 p-1 shadow-lg shadow-blue-500/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-gray-300"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
