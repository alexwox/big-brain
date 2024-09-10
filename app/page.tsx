'use client';
import Image from "next/image";
import { Unauthenticated, Authenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className = "flex min-h-screen flex-col items-center justify-center p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>

        <UserButton />

        <button onClick={() => createDocument({ title: "Hello World" })}> Click Me</button>
      </Authenticated>
    </main>
  );
}
