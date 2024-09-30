"use client";
import { Unauthenticated, Authenticated, AuthLoading } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export function HeaderActions() {
    return <div>
        <Unauthenticated>
            <div className="flex items-center gap-4 border rounded-md p-2 dark:bg-slate-800">
                <SignInButton  />
            </div>
        </Unauthenticated>

        <Authenticated>
            <UserButton />
        </Authenticated>
        <AuthLoading>
            <Loader2 className="animate-spin" />
        </AuthLoading>
    </div>
}