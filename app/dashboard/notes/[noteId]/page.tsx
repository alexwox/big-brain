"use client";
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { DeleteNoteButton } from "./delete-note-button";

export default function NotePage() {
    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    const note = useQuery(api.notes.getNote, { noteId });

    if (!note) {
        return null;
    }

    return (

        <div className="relative">
            <DeleteNoteButton noteId={note._id} />

            <div className="pr-14">
                {note?.text}
            </div>
        </div>
    )
}