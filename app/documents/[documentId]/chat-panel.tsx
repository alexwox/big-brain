
"use client";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function ChatPanel({
    documentId
}: {
    documentId: Id<"documents">
}) {
    const askQuestion = useAction(api.documents.askQuestion);

    return (
        <div className=" rounded-xl bg-gray-900 flex flex-col justify-between gap-3 p-4">
            <div className="h-[600px] overflow-y-auto">
                

            </div>
            <div className="flex gap-2">
                <form className="flex-1" onSubmit={async (e) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const formData = new FormData(target);
                    const text = formData.get("text") as string;

                    await askQuestion({ documentId: documentId, question: text }).then(console.log);
                }}>
                    <div className="flex w-full gap-2">
                    <Input required name="text" className="flex-1" />
                    <Button> Send </Button>
                    </div>
                </form>
            </div>

        </div>)
}