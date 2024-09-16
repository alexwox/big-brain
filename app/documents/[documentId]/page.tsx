'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function DocumentPage(
    { params }: { params: { documentId: string } }
) {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  console.log(params.documentId);
  return (
    <main className="p-24 gap-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"> {document.title} </h1>
      </div>

    </main>
  );
}
