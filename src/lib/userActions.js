"use server";

import prisma from "@/lib/prisma";

export async function getUser(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
