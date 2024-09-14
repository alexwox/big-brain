'use client';
import Image from "next/image";
import { Unauthenticated, Authenticated, useQuery } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>

        <UserButton />
        <ModeToggle />

        <Button onClick={() => createDocument({ title: "Hello World" })}> Click Me</Button>

        {documents?.map((doc) => (
          <div key={doc._id}>{doc.title}</div>
        ))}
      
      </Authenticated>
    </main>
  );
}
