"use client"

import { useState } from "react";
import { SearchForm } from "./search-form";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function SearchPage() {
    const [results, setResults] = useState<typeof api.search.searchAction._returnType>([]);

    return (
        <div className="w-full flex flex-col gap-6">
            <div className=" w-full gap-6 space-y-6 font-bold text-2xl flex items-center justify-between">
                Search
            </div>
            <SearchForm setResults={setResults} />

            <ul className="flex flex-col gap-4">
                {results?.map((result) => {
                    if (result.type === "notes") {
                        return <Link href={`/dashboard/notes/${result.record._id}`} >
                            <li key={result.record._id} className="whitespace-pre-line border border-gray-200 p-4 rounded-md">
                                Type: "note"
                                <br />
                                {result.record.text.substring(0, 500) + "..."}
                            </li>
                        </Link>
                    } else {
                        return (
                            <Link href={`/dashboard/documents/${result.record._id}`}>
                                <li key={result.record._id} className="whitespace-pre-line">
                                    Type: "document"
                                    <br />
                                    {result.record.title}
                                    <br />
                                    {result.record.description}
                                </li>
                            </Link>
                        )
                    }
                })}
            </ul>
        </div>
    )
}
