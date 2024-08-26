"use server";

import { signUpSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { generateIdFromEntropySize } from "lucia";
import prisma from "@/lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUp(credentials) {
  try {
    const { name, email, password, location, role } =
      signUpSchema.parse(credentials);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userId = generateIdFromEntropySize(10);

    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingUser) {
      return { error: "A user with that email address already exists" };
    }

    await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        hashedPassword,
        location,
        role,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "An error occurred while signing up" };
  }
}
