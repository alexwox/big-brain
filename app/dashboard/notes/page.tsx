"use client";
import { CreateNoteButton } from "./create-note-button"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Link from "next/link";

export default function NotePage() {
    const notes = useQuery(api.notes.getNotes); 
    return (
        <main className=" w-full gap-6 space-y-6">

        </main>
    )
}