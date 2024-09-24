"use client";
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

export default function NotePage() {
    const {noteId} = useParams<{noteId: Id<"notes">}>();
    const note = useQuery(api.notes.getNote, {noteId}); 
    return (
        <div className=" w-full gap-6 space-y-6">
            <h1 className="">{note?.text}</h1>
        </div>
    )
}