import "@/styles/globals.css";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Pink Flamingo",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="no">
      <body
        className={cn(
          "min-h-screen antialiased bg-background text-foreground",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
