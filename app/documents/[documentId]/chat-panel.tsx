
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
        <div className=" w-[300px] bg-gray-900 flex flex-col justify-between gap-3 p-4">
            <div className="h-[720px] overflow-y-auto">
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>
                <div className="p4 bg-gray-800">Hello mf</div>

            </div>
            <div className="flex gap-2">
                <form className="flex gap-2" onSubmit={async (e) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    const formData = new FormData(target);
                    const text = formData.get("text") as string;

                    await askQuestion({ documentId: documentId, question: text }).then(console.log);
                }}>
                    <Input required name="text" />
                    <Button> Send </Button>
                </form>
            </div>

        </div>)
}