import { Poppins } from "next/font/google";
import "./globals.css";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./(main)/SessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    template: "%s | Distribr",
    default: "Distribr",
  },
  description: "A modern distribution platform",
};

export default async function RootLayout({ children }) {
  const session = await validateRequest();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider value={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
