interface ChatHeaderProps {
  onNewChat: () => void;
}

const ChatHeader = ({ onNewChat }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-purple-900/50 bg-black/40 backdrop-blur-md p-4">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-purple-900/50 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-purple-400"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <h1 className="text-lg font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Sales AI Chat
        </h1>
      </div>

      <button
        onClick={onNewChat}
        className="bg-black/20 border border-purple-800/50 hover:bg-purple-900/20 text-purple-300 px-4 py-2 rounded flex gap-2 text-sm items-center transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        New Chat
      </button>
    </div>
  );
};

export default ChatHeader;
