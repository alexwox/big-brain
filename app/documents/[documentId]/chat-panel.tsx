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
        <div className=" rounded-xl bg-gray-900 flex flex-col justify-between gap-3 p-6 rounded-xl">
            <div className="h-[600px] overflow-y-auto space-y-2">
                <div className="bg-slate-950 p-4 rounded">
                    Ask about your document
                </div>
                {chats?.map((chat) => (
                    <div className={cn(
                        {
                            "bg-slate-800 p-4 rounded": chat.isHuman,
                            "text-right": chat.isHuman,
                        },
                        "rounded p-2 whitespace-prel",
                    )}>
                        {chat.isHuman ? "You" : "AI"}: {chat.text}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <QuestionForm documentId={documentId}/>
            </div>

        </div>)
}