import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";

export default async function Layout({ children }) {
  const session = await validateRequest();

  // if (!session.user) redirect("/login");
  if (session.user) redirect("/dashboard");

  return <SessionProvider value={session}>{children}</SessionProvider>;
}
