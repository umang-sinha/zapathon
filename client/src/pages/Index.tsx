import ChatContainer from "@/components/ChatContainer";
import { useEffect } from "react";

const Index = () => {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <ChatContainer />
    </div>
  );
};

export default Index;
