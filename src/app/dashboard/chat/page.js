"use client";
import React from "react";
import ChatList from "@/components/ChatList";
import { useSearchParams } from "next/navigation";

const Chat = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r">
        <h1 className="text-2xl font-bold mb-4 p-4">Chats</h1>
        <ChatList />
      </div>
      <div className="w-2/3 p-4">
        {userId ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Chat with User {userId}</h2>
            {/* Chat messages will be displayed here */}
            <div className="h-[calc(95vh-200px)] overflow-y-auto mb-4">
              {/* Chat messages */}
            </div>
            <div className="mt-auto">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full bg-white p-2 border rounded"
              />
            </div>
          </div>
        ) : (
          <p>Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
