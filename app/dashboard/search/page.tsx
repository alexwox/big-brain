"use client";

import { useState, useEffect } from "react";
import { SearchForm } from "./search-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { NotebookPenIcon, Files } from "lucide-react";

function SearchResults({
  url,
  score,
  type,
  text,
}: {
  url: string;
  score: number;
  type: string;
  text: string;
}) {
  return (
    <Link href={url}>
      <li className="border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="font-bold flex items-center gap-2">
              {type === "Note" ? (
                <NotebookPenIcon className="h-4 w-4" />
              ) : (
                <Files className="h-4 w-4" />
              )}
              {type === "Note" ? "Note" : "Document"}
            </div>
            <div className="text-gray-500 text-sm">
              (Relevance: {score.toFixed(2)})
            </div>
          </div>

          <div className="text-sm sm:text-base line-clamp-2">
            {text.substring(0, 200)}...
          </div>
        </div>
      </li>
    </Link>
  );
}

export default function SearchPage() {
  const [results, setResults] = useState<
    typeof api.search.searchAction._returnType
  >([]);

  useEffect(() => {
    const searchResults = localStorage.getItem("searchResults");
    if (searchResults) {
      setResults(JSON.parse(searchResults));
    }
  }, []);

  return (
    <main className="flex-1 overflow-y-auto px-2 sm:px-4">
      <div className="max-w-[1200px] mx-auto w-full p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <h1 className="text-xl sm:text-2xl font-bold">Search</h1>
        </div>

        <div className="space-y-6">
          <SearchForm
            setResults={(searchResults) => {
              setResults(searchResults);
              localStorage.setItem(
                "searchResults",
                JSON.stringify(searchResults)
              );
            }}
          />

          <ul className="flex flex-col gap-4">
            {results?.map((result) => {
              if (result.type === "notes") {
                return (
                  <SearchResults
                    key={result.record._id}
                    type="Note"
                    url={`/dashboard/notes/${result.record._id}`}
                    score={result.score}
                    text={result.record.text}
                  />
                );
              } else {
                return (
                  <SearchResults
                    key={result.record._id}
                    type="Document"
                    url={`/dashboard/documents/${result.record._id}`}
                    score={result.score}
                    text={
                      result.record.title + ": " + result.record.description
                    }
                  />
                );
              }
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
