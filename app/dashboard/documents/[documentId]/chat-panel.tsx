"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { QuestionForm } from "./question-form";


export default function ChatPanel({
    documentId
}: {
    documentId: Id<"documents">
}) {
    const chats = useQuery(api.chats.getChatsForDocument, {
        documentId: documentId
    })

    return (
        <div className=" rounded-xl flex flex-col justify-between gap-3 p-6 rounded-xl border-2 border-slate-900">
            <div className="h-[600px] overflow-y-auto space-y-2">
                <div className="dark:bg-slate-950 bg-white p-4 rounded dark:text-white text-black font-bold">
                    Ask about your document
                </div>

                {chats?.map((chat) => (
                    <div className={cn(
                        {
                            "border-2 border-blue-200 text-black p-4 rounded": chat.isHuman,
                            "dark:border-blue-900 dark:text-blue-200 p-4 rounded": chat.isHuman,

                            "bg-gray-200 text-black p-4 rounded": !chat.isHuman,
                            "dark:bg-gray-700 dark:text-gray-200 p-4 rounded": !chat.isHuman,
                            
                            "text-right": chat.isHuman,

                            "border-2 border-slate-200 dark:border-slate-600": true,
                        },
                        "rounded p-2 whitespace-pre-wrap"
                    )}>
                        {chat.isHuman ? "You" : "AI"}: {chat.text}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <QuestionForm documentId={documentId} />
            </div>

        </div>
    )
}