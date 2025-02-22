"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotePage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto w-full p-4 sm:p-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center px-8 sm:px-10">
          <h1 className="text-2xl sm:text-3xl font-bold pl-2">Notes</h1>
          <Button asChild variant="default" size="lg">
            <Link href="/dashboard/notes/new" className="gap-2">
              <Plus className="h-5 w-5" />
              Create Note
            </Link>
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 py-12 sm:py-16">
          <Image
            src="/notes.svg"
            alt="No notes"
            width={300}
            height={300}
            className="w-[250px] sm:w-[300px] h-auto"
            priority
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            No notes found
          </h2>
          <p className="text-base text-gray-500 text-center max-w-md px-4">
            Create a note to get started.
          </p>
          <Button asChild variant="default" size="lg">
            <Link href="/dashboard/notes/new" className="gap-2">
              <Plus className="h-5 w-5" />
              Create Note
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
