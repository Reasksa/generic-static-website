"use client";

import { signIn, signOut } from "next-auth/react";

export function AuthButton({ authed }: { authed: boolean }) {
  return authed ? (
    <button
      onClick={() => signOut()}
      className="rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
    >
      Sign out
    </button>
  ) : (
    <button
      onClick={() => signIn("github")}
      className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
    >
      Sign in
    </button>
  );
}