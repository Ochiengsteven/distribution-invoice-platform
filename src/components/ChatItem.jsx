import React from "react";
import Link from "next/link";

const ChatItem = ({ chat }) => {
  return (
    <Link href={`/dashboard/chat?userId=${chat.userId}`}>
      <div className="p-4 border-b hover:bg-gray-100 cursor-pointer">
        <h3 className="font-semibold">{chat.name}</h3>
        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
      </div>
    </Link>
  );
};

export default ChatItem;
