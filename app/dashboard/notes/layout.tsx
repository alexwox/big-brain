"use client";
import { CreateNoteButton } from "./create-note-button";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import { Skeleton } from "../../../components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });

  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="flex-1 h-full flex flex-col gap-6 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold pl-2">Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 space-y-4">
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

      {notes?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-8 sm:py-12">
          <Image
            src="/notes.svg"
            alt="Empty state"
            width={300}
            height={300}
            className="w-[250px] sm:w-[300px] h-auto"
            priority
          />
          <h2 className="text-2xl font-bold">No notes found</h2>
          <p className="text-sm text-gray-500 text-center px-4">
            Create a note to get started.
          </p>
          <CreateNoteButton />
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 lg:shrink-0 border-b lg:border-b-0 pb-4 lg:pb-0">
            <ul className="space-y-4">
              {notes?.map((note) => (
                <li
                  key={note._id}
                  className={cn(
                    "px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                    {
                      "bg-slate-100 dark:bg-slate-800": note._id === noteId,
                    }
                  )}
                >
                  <Link
                    href={`/dashboard/notes/${note._id}`}
                    className="block truncate"
                  >
                    {note.text.substring(0, 50) + "..."}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 min-w-0">{children}</div>
        </div>
      )}
    </main>
  );
}
