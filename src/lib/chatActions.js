"use server";

import prisma from "@/lib/prisma";

export async function createChat(participantIds) {
  try {
    const chat = await prisma.chat.create({
      data: {
        participants: {
          create: participantIds.map((id) => ({ userId: id })),
        },
      },
    });
    return chat;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}

export async function sendMessage({ senderId, receiverId, content }) {
  try {
    let chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: senderId } } },
          { participants: { some: { userId: receiverId } } },
        ],
      },
    });

    if (!chat) {
      chat = await createChat([senderId, receiverId]);
    }

    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        chatId: chat.id,
        content,
      },
    });

    return { success: true, message };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function getChatMessages(chatId) {
  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
    include: { sender: true, receiver: true },
  });
  return messages;
}

export async function getUserChats(userId) {
  const chats = await prisma.chat.findMany({
    where: {
      participants: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return chats.map((chat) => {
    const otherParticipant = chat.participants.find(
      (p) => p.userId !== userId
    ).user;
    const lastMessage = chat.messages[0];
    return {
      id: chat.id,
      userId: otherParticipant.id,
      name: otherParticipant.name,
      lastMessage: lastMessage ? lastMessage.content : "No messages yet",
    };
  });
}
