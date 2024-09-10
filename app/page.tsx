'use client';
import Image from "next/image";
import { Unauthenticated, Authenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className = "flex min-h-screen flex-col items-center justify-center p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </main>
  );
}
