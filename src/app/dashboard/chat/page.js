/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import ChatList from "@/components/ChatList";
import { useSearchParams } from "next/navigation";
import { getUser } from "@/lib/userActions";
import { getUserChats, sendMessage, getChatMessages } from "@/lib/chatActions";
import { useSession } from "@/app/(main)/SessionProvider";
import { useSocket } from "@/hooks/useSocket";
import { message } from "antd";

const Chat = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [userName, setUserName] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useSession();
  const { isConnected, sendSocketMessage, socket } = useSocket();

  useEffect(() => {
    loadChats();
  }, [user.id]);

  useEffect(() => {
    if (userId) {
      getUser(userId).then((user) => {
        if (user) {
          setUserName(user.name);
        }
      });
      loadMessages();
    }
  }, [userId]);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      console.log("Received new message:", msg);
      if (msg.chatId === getChatId()) {
        console.log("Adding message to current chat");
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
      loadChats();
    };

    if (isConnected && socket) {
      socket.on("chat message", handleNewMessage);
    }

    return () => {
      if (isConnected && socket) {
        socket.off("chat message", handleNewMessage);
      }
    };
  }, [isConnected, socket, userId]);

  useEffect(() => {
    if (userId) {
      loadMessages();
    }
  }, [userId]);

  const loadChats = async () => {
    const fetchedChats = await getUserChats(user.id);
    setChats(fetchedChats);
    setLoading(false);
  };

  const loadMessages = async () => {
    const chatId = getChatId();
    if (chatId) {
      const fetchedMessages = await getChatMessages(chatId);
      setMessages(fetchedMessages);
    } else {
      setMessages([]);
    }
  };

  const getChatId = () => {
    const chat = chats.find((chat) => chat.userId === userId);
    return chat ? chat.id : null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        senderId: user.id,
        receiverId: userId,
        content: inputMessage,
      };

      const result = await sendMessage(newMessage);
      if (result.success) {
        setMessages((prevMessages) => [...prevMessages, result.message]);
        setInputMessage("");
        loadChats();
        sendSocketMessage(result.message);
      } else {
        message.error("Failed to send message");
      }
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r">
        <h1 className="text-2xl font-bold mb-4 p-4">Chats</h1>
        {loading ? <div>Loading chats...</div> : <ChatList chats={chats} />}
      </div>
      <div className="w-2/3 p-4">
        {userId ? (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Chat with {userName || `User ${userId}`}
            </h2>
            <div className="h-[calc(95vh-200px)] overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.senderId === user.id ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.senderId === user.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="mt-auto flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-white p-2 border rounded-l"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        ) : (
          <p>Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
