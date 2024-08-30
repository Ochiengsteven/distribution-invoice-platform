import React from "react";
import ChatItem from "./ChatItem";

const ChatList = ({ chats }) => {
  if (chats.length === 0) {
    return <div>No chats yet. Start a new conversation!</div>;
  }

  return (
    <div>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
