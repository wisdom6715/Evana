import React from 'react';
import Image from 'next/image';
import SupportAI from '../../_components/assets/images/AI.webp'
import userImg from '../../_components/assets/images/user.webp'

type ChatType = 'virtual' | 'appointment' | 'support' | 'sales';

interface ChatWindowProps {
  type: ChatType;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ type }) => {
  const chatData = {
    virtual: [
      { id: 1, text: "Hey there! How can I assist you today?", ai: true },
      { id: 2, text: "I need help finding product information", user: true },
      { id: 3, text: "I'll be happy to help you find product details. What type of product are you looking for?", ai: true },
      { id: 4, text: "I'm looking for AI-powered chatbots", user: true },
      { id: 5, text: "We have several chatbot solutions available. Our most popular one is KustomAI Pro, which offers advanced NLP capabilities and seamless integration.", ai: true }
    ],
    appointment: [
      { id: 1, text: "Hi, I'd like to schedule a demo", user: true },
      { id: 2, text: "I'd be happy to help you schedule a demo. What's your preferred date and time?", ai: true },
      { id: 3, text: "Is tomorrow at 2 PM EST available?", user: true },
      { id: 4, text: "Let me check our calendar... Yes, 2 PM EST tomorrow is available! Would you like me to book that slot?", ai: true },
      { id: 5, text: "Yes, please book it", user: true }
    ],
    support: [
      { id: 1, text: "I'm having issues with API integration", user: true },
      { id: 2, text: "I'll help you resolve the API integration issues. What specific error are you encountering?", ai: true },
      { id: 3, text: "Getting a 401 unauthorized error", user: true },
      { id: 4, text: "This usually happens due to incorrect API credentials. Have you double-checked your API key in the request header?", ai: true },
      { id: 5, text: "Let me verify that quickly", user: true }
    ],
    sales: [
      { id: 1, text: "I'm interested in your enterprise plan", user: true },
      { id: 2, text: "Great to hear you're interested in our enterprise plan! It offers unlimited API calls, dedicated support, and custom model training. What's your current usage volume?", ai: true },
      { id: 3, text: "We process about 100k messages monthly", user: true },
      { id: 4, text: "Perfect! Our enterprise plan would be ideal for that volume. Would you like to see a detailed pricing breakdown?", ai: true },
      { id: 5, text: "Yes, please share the details", user: true }
    ]
  };

  const titles = {
    virtual: "Virtual Assistant",
    appointment: "Appointment Scheduler",
    support: "Customer Support",
    sales: "Sales Assistant"
  };

  const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800/50 h-[40rem] backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        {/* Mac-style window dots with title */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700/50">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-white text-sm font-medium">{titles[type]}</span>
        </div>

        {/* Chat messages */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {chatData[type].map((message) => (
            <div key={message.id} 
              className={`flex items-start gap-3 ${message.user ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="flex-shrink-0 w-8 h-8 relative rounded-full overflow-hidden">
                <Image
                  src={message.user ? userImg : SupportAI}
                  alt={message.user ? "User Avatar" : "AI Avatar"}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.user 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-slate-700/50 backdrop-blur-sm'
              }`}>
                <p className="text-sm text-white leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="flex gap-2 absolute bottom-4 left-4 right-4">
          <input 
            type="text" 
            placeholder="Type your message..."
            className="w-full bg-slate-700/30 border border-gray-700/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors text-white">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;