"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { loginSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(credentials) {
  try {
    const validatedCredentials = loginSchema.parse(credentials);
    const { email, password } = validatedCredentials;

    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.hashedPassword) {
      return { error: "Invalid email or password" };
    }

    const validPassword = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );

    if (!validPassword) {
      return { error: "Invalid email or password" };
    }
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error.name === "ZodError") {
      return { error: "Invalid input. Please check your email and password." };
    }
    console.error(error);
    return { error: "An error occurred while logging in" };
  }
}
