"use client";

import Link from "next/link";
import { FilesIcon, NotebookPen, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


export function SideNav() {

    const pathname = usePathname();

    return (
        <nav>
            <ul className="space-y-8">
                <li>
                    <Link className={cn(
                        "flex items-center gap-2 text-xl hover:text-slate-500",
                        {
                        'text-blue-500': pathname.endsWith("/documents")
                        }
                        )} 
                        href="/dashboard">
                        
                        <FilesIcon />
                        Documents
                    </Link>
                </li>
                <li>
                    <Link className={cn(
                        "flex items-center gap-2 text-xl hover:text-slate-500",
                        {
                        'text-blue-500': pathname.endsWith("/notes")
                        }
                        )} 
                        href="/dashboard/notes">
                        <NotebookPen />
                        Notes
                    </Link>
                </li>
                {/* <li>
                    <Link className={cn(
                        "flex items-center gap-2 text-xl hover:text-slate-500",
                        {
                        'text-blue-500': pathname.endsWith("/settings/")
                        }
                        )} 
                        href="/dashboard/settings">
                        <Settings />
                        Settings
                    </Link>
                </li> */}
            </ul>

        </nav>
    )
}