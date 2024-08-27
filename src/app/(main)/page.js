"use client";

import { useSession } from "./SessionProvider";

export default function Home() {
  const { user } = useSession();
  return (
    <main>
      <h1>Home</h1>
      <p>Welcome back, {user.name}!</p>
    </main>
  );
}
