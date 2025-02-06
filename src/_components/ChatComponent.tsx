import React, { useState, FormEvent, useEffect, useRef } from "react";
import styles from "@/_components/styles/chatStyle.module.css";
import Image from "next/image";
import ChatbotImage from "@/app/landingPage/_components/assets/images/AI.webp";
import useCompany from "@/services/fetchComapnyData";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import ChatProfile from "./_subComponent/ChatProfile";
import BroadCastUpdate from "./_subComponent/Update";

interface Message {
  type: "answer" | "query";
  content: string;
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [query, setQuery] = useState<string>("");
  const [switchfeature, setSwitchFeature] = useState<boolean>(true)
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const company_Id = localStorage.getItem("companyId");
  const { company } = useCompany({
    userId: user?.uid,
    companyId: company_Id!,
  });

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    if (message.type === "answer") {
      return (
        <div className="flex items-start gap-2 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={ChatbotImage}
              alt="AI"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col max-w-[70%]">
            <div className="bg-gray-200 p-3 rounded-lg rounded-tl-none">
              <p className="m-0 text-sm">{message.content}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-start gap-2 mb-4 flex-row-reverse">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-blue-500 flex items-center justify-center">
          <span className="text-white text-sm">You</span>
        </div>
        <div className="flex flex-col items-end max-w-[70%]">
          <div className="bg-blue-500 p-3 rounded-lg rounded-tr-none">
            <p className="m-0 text-sm text-white">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.generalContainer}>
      <ChatProfile setSwitchFeature={setSwitchFeature}/>
      {
        switchfeature? (
            <div className="w-[100%]">
                <div className={styles.chatContainer}>
                <div className={styles.chatArea} ref={chatAreaRef}>
                    <p className={styles.subText}>Your virtual assistant, ready to help with frequently asked questions.</p>
                    <div className="flex flex-col p-4">
                    {messages.map((message, index) => (
                        <MessageBubble key={index} message={message} />
                    ))}
                    </div>
                </div>
                    <form className="border-t bg-white grid grid-cols-[80%_20%] items-center gap-1" onSubmit={handleSubmit}>
                        <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 w-[100%] pl-2 rounded-full focus:outline-none focus:border-blue-500"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        />
                        <button
                        type="submit"
                        style={{ width: "60%", height: "60%", backgroundColor: "#0c0e0e" }}
                        className="flex items-center justify-center rounded-full text-white transition-colors"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                        </button>
                    </form>
                </div>
            </div>
        ): <BroadCastUpdate />
      }
    </div>
  );
};

export default ChatComponent;