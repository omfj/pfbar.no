"use client";

import { signOut } from "next-auth/react";

export function SignOutNavButton() {
  return (
    <li>
      <button
        className="text-lg font-medium hover:underline underline-offset-4 decoration-2"
        onClick={() => signOut()}
      >
        Logg ut
      </button>
    </li>
  );
}
