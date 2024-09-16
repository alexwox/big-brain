'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export default function DocumentPage(
  { params }: { params: { documentId: Id<"documents"> } }
) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId
  });
  const createDocument = useMutation(api.documents.createDocument);


  if (!document) {
    return <div>No access to this document</div>;
  }

  console.log(params.documentId);
  return (
    <main className="p-24 gap-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold"> {document.title} </h1>
      </div>

      <div className="flex gap-12">
        <div className="bg-gray-900 rounded p-4 flex-1 h-[800px]">
          {document.documentUrl && <iframe 
            className="w-full h-full"
            src={document.documentUrl} />}
        </div>
        <div className=" w-[300px] bg-gray-900 rounded-md p-4">
          <h2 className="text-lg font-bold">Chat</h2>
        </div>
      </div>
    </main>
  );
}
