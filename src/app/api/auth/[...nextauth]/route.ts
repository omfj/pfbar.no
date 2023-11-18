import { options } from "@/auth/options";
import NextAuth from "next-auth/next";

const handler = NextAuth(options);

export { handler as POST, handler as GET };
