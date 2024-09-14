'use client';

import { ModeToggle } from "@/components/ui/mode-toggle";
import { HeaderActions } from "./header-actions";

import Image from "next/image";
export function Header() {
    return <div className = "bg-slate-900 py-4"> 
        <div className = "container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 text-2xl">
                <Image src="/logo.png" width={40} height={40}
                className="rounded"
                alt="an image of a brain" />
                BIGBRAIN
            </div>

            <div className="flex items-center gap-4">  
                <ModeToggle />
                <HeaderActions />
            </div> 
        </div>
    </div>
}