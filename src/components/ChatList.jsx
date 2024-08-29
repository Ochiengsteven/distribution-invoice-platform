import React from "react";
import ChatItem from "./ChatItem";

const ChatList = () => {
  // This would typically come from an API or database
  const chats = [
    { id: 1, userId: "user1", name: "John Doe", lastMessage: "Hello there!" },
    { id: 2, userId: "user2", name: "Jane Smith", lastMessage: "How are you?" },
    {
      id: 3,
      userId: "user3",
      name: "Bob Johnson",
      lastMessage: "See you soon",
    },
  ];

  return (
    <div>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
