"use client";
import { CreateNoteButton } from "./create-note-button"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "../../../lib/utils";

export default function NotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const notes = useQuery(api.notes.getNotes);
    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    return (
        <main className=" w-full gap-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notes</h1>
                <CreateNoteButton />
            </div>

            <div className="flex gap-12">
                <ul className="space-y-6 w-[200px]">
                    {notes?.map((note) => (
                        <li className={cn("hover:text-slate-500 p-2 rounded-md", {
                            "text-blue-500": note._id === noteId
                        })} key={note._id}>
                            <Link href={`/dashboard/notes/${note._id}`}>{note.text.substring(0, 20) + "..."}</Link>
                        </li>
                    ))}
                </ul>

                <div className="w-full border rounded-xl border-slate-200 dark:border-slate-800 p-6">{children}</div>
            </div>
        </main>
    )
}