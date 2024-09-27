"use client";
import { CreateNoteButton } from "./create-note-button"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import { Skeleton } from "../../../components/ui/skeleton"

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

            {!notes && (
                <div className="flex gap-10">
                    <div className = "w-[180px] space-y-4"> 
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                    </div>
                    <div className="flex-1">
                        <Skeleton className="h-[420px] w-full" />
                    </div>
                </div>
            )}

            {notes && notes.length === 0 && (
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

            {notes && notes.length > 0 && (
                <div className="flex gap-12 max-w-full">
                    <ul className="space-y-6 w-64">
                    {notes?.map((note) => (
                        <li className={cn("hover:text-slate-500 dark:border-slate-800", {
                            "text-blue-500": note._id === noteId
                        })} key={note._id}>
                            <Link href={`/dashboard/notes/${note._id}`}>{note.text.substring(0, 20) + "..."}</Link>
                        </li>
                    ))}
                </ul>

                    <div className="flex-grow max-w-full mx-auto overflow-auto">{children}</div>
                </div>
            )}
        </main>
    )
}