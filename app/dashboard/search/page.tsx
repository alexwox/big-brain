"use client"

import { useState, useEffect } from "react";
import { SearchForm } from "./search-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { NotebookPenIcon, Files } from "lucide-react";

function SearchResults({ url, score, type, text }: { url: string, score: number, type: string, text: string }) {
    return (
        <Link href={url} >
            <li className="whitespace-pre-line border border-gray-200 p-4 rounded-md">
                <div className="flex items-center gap-2 items-center justify-between">
                    <div className="font-bold flex items-center gap-2"  >
                        {type === "Note" ? <NotebookPenIcon className="w-4 h-4" /> : <Files className="w-4 h-4"  />}
                        {type === "Note" ? "Note" : "Document"}
                    </div>
                    <div className="text-gray-500 text-sm">
                        (Relevance: {score.toFixed(2)})
                    </div>
                </div>

                <div>
                    {text.substring(0, 100) + "..."}
                </div>
            </li>
        </Link>
    )
}

export default function SearchPage() {
    const [results, setResults] = useState<typeof api.search.searchAction._returnType>([]);

    useEffect(() => {
        const searchResults = localStorage.getItem("searchResults")
        if (searchResults) {
            setResults(JSON.parse(searchResults))
        }
    }, [])

    return (
        <div className="w-full flex flex-col gap-6 pb-24">
            <div className=" w-full gap-6 space-y-6 font-bold text-2xl flex items-center justify-between">
                Search
            </div>
            <SearchForm setResults={(searchResults) => {
                setResults(searchResults)
                localStorage.setItem("searchResults", JSON.stringify(searchResults))
            }} />

            <ul className="flex flex-col gap-4">
                {results?.map((result) => {
                    if (result.type === "notes") {
                        return (
                            <SearchResults
                                type="Note"
                                url={`/dashboard/notes/${result.record._id}`}
                                score={result.score}
                                text={result.record.text}
                            />)
                    } else {
                        return (
                            <SearchResults
                                type="Document"
                                url={`/dashboard/documents/${result.record._id}`}
                                score={result.score}
                                text={result.record.title + ": " + result.record.description}
                            />)
                    }
                })}
            </ul>
        </div>
    )
}
