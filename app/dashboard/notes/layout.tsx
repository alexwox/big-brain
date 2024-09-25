"use client";
import { CreateNoteButton } from "./create-note-button"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "../../../lib/utils";
import Image from "next/image";

export default function NotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const notes = useQuery(api.notes.getNotes);
    const { noteId } = useParams<{ noteId: Id<"notes"> }>();

    const hasNotes = notes && notes.length > 0;
    return (
        <main className=" w-full gap-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notes</h1>
                <CreateNoteButton />
            </div>

            {!hasNotes && (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                <Image 
                  src="/notes.svg" 
                  alt="Empty state" 
                  width={300} 
                  height={300} 
                />
                <h2 className="text-2xl font-bold">No notes found</h2>
                <p className="text-sm text-gray-500">
                  Create a note to get started.
                </p>
                <CreateNoteButton />
              </div>)}


            {hasNotes && (
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

                    <div className="w-full">{children}</div>
                </div>
            )}
        </main>
    )
}