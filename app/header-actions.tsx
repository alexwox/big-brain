"use client";
import { Unauthenticated, Authenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Loader2 } from "lucide-react";

export function HeaderActions() {
    return <div>
        <Unauthenticated>
            <SignInButton />
        </Unauthenticated>

        <Authenticated>
            <UserButton />
        </Authenticated>
        <AuthLoading>
            <Loader2 className="animate-spin" />
        </AuthLoading>
    </div>
}