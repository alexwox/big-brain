"use client";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { QuestionForm } from "./question-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(api.chats.getChatsForDocument, {
    documentId: documentId,
  });

  // Create a ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 py-4">
          <div className="bg-muted px-4 py-2 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Ask questions about your document
            </p>
          </div>

          {chats?.map((chat) => (
            <div
              key={chat._id}
              className={cn(
                "flex w-full",
                chat.isHuman ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[85%] sm:max-w-[75%]",
                  {
                    "bg-primary text-primary-foreground": chat.isHuman,
                    "bg-muted": !chat.isHuman,
                    "text-right": chat.isHuman,
                  }
                )}
              >
                <div className="mb-1 text-xs opacity-75">
                  {chat.isHuman ? "You" : "AI"}
                </div>
                <div className="text-sm sm:text-base whitespace-pre-wrap break-words">
                  {chat.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="pt-4 border-t">
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
}
