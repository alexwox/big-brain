"use client";
import { Unauthenticated, Authenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function HeaderActions() {
    return <div>
        <Unauthenticated>
            <SignInButton />
        </Unauthenticated>

        <Authenticated>
            <UserButton />
        </Authenticated>
        <AuthLoading>
            Loading...
        </AuthLoading>
    </div>
}