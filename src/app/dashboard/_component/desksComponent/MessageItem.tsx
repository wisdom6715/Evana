'use client'
import React, { useState, useEffect } from 'react';
import { useIncomingMessages } from '@/hook/useChatmessages';

interface MessageItemProps {
  onSessionSelect?: (sessionId: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ onSessionSelect }) => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:5001/chat/sessions/b0c2997a-9cea-454b-bcb1-f4709055713a`);
        const data = await response.json();
        setSessions(data.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSession(sessionId);
    onSessionSelect?.(sessionId);
  };

  return (
    <div className="space-y-1">
      {sessions.map((session) => (
        <div
          key={session.session_id}
          onClick={() => handleSessionSelect(session.session_id)}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            selectedSession === session.session_id 
              ? 'bg-blue-100' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <p className="font-medium">User: {session.user_id}</p>
          <p className="text-xs text-gray-500">
            {session.messages?.message || 'No messages'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageItem;