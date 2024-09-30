"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HeaderActions } from "./header-actions";

import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export function Header() {
    const {isSignedIn} = useUser();

    return (
        <div className="dark:bg-slate-900 bg-slate-100 py-4 z-10 relative border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-24 items-center">
                    {!isSignedIn ? (
                        <Link href="/" className="flex items-center gap-8 text-2xl">
                            <Image
                                src="/logo.png"
                                width={40}
                                height={40}
                                className="rounded"
                                alt="an image of a brain"
                            />
                            <span className="font-bold text-xl" >BIGBRAIN</span>
                        </Link>
                    ) : (
                        <Link href="/dashboard" className="flex items-center gap-8 text-2xl">
                            <Image
                                src="/logo.png"
                                width={40}
                                height={40}
                                className="rounded"
                                alt="an image of a brain"
                            />
                            <span className="font-bold text-xl" >BIGBRAIN</span>
                        </Link>
                    )}

                    <nav className="flex items-center gap-8">
                        <OrganizationSwitcher />
                        <Link href="/dashboard" className="hover:text-slate-300 transition-colors font-semibold"> Dashboard</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4 w-full justify-end">
                    <ModeToggle />
                    <HeaderActions />
                </div>
            </div>
        </div>
    )
}