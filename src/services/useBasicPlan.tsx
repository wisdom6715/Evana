import { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

// Define interfaces for the data structures
interface Query {
  messageId: string;
  userId: string;
  status: 'pending' | 'answered';
  message?: string;
  timestamp?: string;
  [key: string]: any; // For any additional properties
}

interface Queries {
  [messageId: string]: Query;
}

interface StatusUpdate {
  messageId: string;
  status: 'pending' | 'answered';
}

interface ReplyPayload {
  agentId: string;
  customerId: string;
  companyId: string;
  message: string;
  messageId: string;
}

interface UseChatDashboardProps {
  queries: Queries;
  selectedQuery: Query | null;
  setSelectedQuery: (query: Query | null) => void;
  sendReply: (message: string) => void;
  sanitizeMessage: (message: string) => string;
  userId: string;
}

const useChatDashboard = (
  companyId: string | undefined,
  initialUserId?: string
): UseChatDashboardProps => {
  const userId = initialUserId || `agent_${Math.floor(Math.random() * 1000)}`;
  const [queries, setQueries] = useState<Queries>({});
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // LocalStorage Helpers
  const loadSavedStatuses = (): { [key: string]: string } => {
    const savedStatuses = localStorage.getItem('queryStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : {};
  };

  const saveStatuses = (updatedQueries: Queries): void => {
    const statuses: { [key: string]: string } = {};
    Object.keys(updatedQueries).forEach(messageId => {
      statuses[messageId] = updatedQueries[messageId].status;
    });
    localStorage.setItem('queryStatuses', JSON.stringify(statuses));
    console.log('✅ Saved statuses to localStorage:', statuses);
  };

  const sanitizeMessage = (message: string): string => {
    console.log('🔍 Starting message sanitization...');
    const sanitized = message
      .replace(/(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)/g, "[REDACTED PHONE]")
      .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, "[REDACTED EMAIL]")
      .replace(/\b(salary|payroll|pay stub|pay slip|compensation)\b/gi, "[REDACTED PAY INFO]");
    console.log('✅ Message sanitization complete');
    return sanitized;
  };

  useEffect(() => {
    if (!companyId) return; // Early return if companyId is undefined

    socketRef.current = io("http://localhost:5001");
    socketRef.current.emit("register_agent", { userId, companyId });

    const socket = socketRef.current; // Create a reference for cleanup

    socket.on("load_past_queries", (pastQueries: Query[]) => {
      const savedStatuses = loadSavedStatuses();
      const newQueries: Queries = {};
      pastQueries.forEach(data => {
        const messageId = data.messageId;
        let status = data.status || savedStatuses[messageId] || "pending";
        if (status !== "answered") {
          status = "pending";
        }
        newQueries[messageId] = { ...data, status };
      });
      setQueries(newQueries);
    });

    socket.on("new_query", (data: Query) => {
      console.log('📩 New query received:', data);
      setQueries(prev => ({
        ...prev,
        [data.messageId]: { ...data, status: 'pending' }
      }));
    });

    socket.on("status_update", (data: StatusUpdate) => {
      console.log('🔄 Status update received:', data);
      setQueries(prev => {
        const updated = { ...prev };
        if (updated[data.messageId]) {
          updated[data.messageId].status = data.status;
        }
        saveStatuses(updated);
        return updated;
      });
      socket.emit("fetch_latest_queries");
    });

    socket.on("latest_queries", (pastQueries: Query[]) => {
      const newQueries: Queries = {};
      pastQueries.forEach(data => {
        newQueries[data.messageId] = data;
      });
      setQueries(newQueries);
      console.log("✅ Synced messages with latest database values.");
    });

    socket.on("reply_sent", (data: { messageId: string, success: boolean }) => {
      if (data.success) {
        console.log(`✅ Reply for message ${data.messageId} sent successfully`);
      } else {
        console.error(`❌ Failed to send reply for message ${data.messageId}`);
      }
    });

    socket.on("email_sent", (data: { messageId: string, success: boolean }) => {
      if (data.success) {
        console.log(`✉️ Email notification for message ${data.messageId} sent successfully`);
      } else {
        console.error(`❌ Failed to send email notification for message ${data.messageId}`);
      }
    });

    return () => {
      if (socket) {
        console.log('🔌 Disconnecting socket');
        socket.disconnect();
      }
    };
  }, [companyId, userId]);

  const sendReply = (message: string): void => {
    if (!message.trim() || !selectedQuery || !companyId) {
      console.warn('❌ Cannot send reply: empty message, no selected query, or missing companyId');
      return;
    }

    console.log('📤 Preparing to send reply for message:', selectedQuery.messageId);

    setQueries(prev => {
      const updated = { ...prev };
      if (updated[selectedQuery.messageId]) {
        updated[selectedQuery.messageId].status = 'answered';
      }
      saveStatuses(updated);
      return updated;
    });

    const payload: ReplyPayload = {
      agentId: userId,
      customerId: selectedQuery.userId,
      companyId,
      message,
      messageId: selectedQuery.messageId
    };

    console.log('📤 Sending reply payload:', payload);
    socketRef.current?.emit("send_reply", payload);
    console.log(`✅ Message ${selectedQuery.messageId} marked as answered and saved`);
  };

  return {
    queries,
    selectedQuery,
    setSelectedQuery,
    sendReply,
    sanitizeMessage,
    userId
  };
};

export default useChatDashboard;