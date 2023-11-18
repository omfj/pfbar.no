"use client";

import { signIn } from "next-auth/react";

export function SignInWithGoogle() {
  return (
    <button
      onClick={() => signIn("google")}
      className="py-2 px-8 bg-primary w-full rounded-lg"
    >
      Logg inn med Google
    </button>
  );
}
