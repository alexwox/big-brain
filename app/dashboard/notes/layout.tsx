"use client";
import { CreateNoteButton } from "./create-note-button"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Link from "next/link";

export default function NotesLayout({ 
    children, 
}: {
    children: React.ReactNode;
}) {
    const notes = useQuery(api.notes.getNotes); 
    return (
        <main className=" w-full gap-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notes</h1>
                <CreateNoteButton />
            </div>

            <ul className="flex flex-col gap-6">
                {notes?.map((note) => (
                    <li key={note._id}>
                        <Link href={`/dashboard/notes/${note._id}`}>{note.text.substring(0, 20) + "..."}</Link>
                    </li>
                ))}
            </ul>

            {children}
        </main>
    )
}