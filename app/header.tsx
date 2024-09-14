'use client';
import { Unauthenticated, Authenticated, useQuery } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
    return <div> HEADER 
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>

      <Authenticated>
        <UserButton />
        <ModeToggle />
      </Authenticated>
    </div>
}