'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/ui/document-card";
import { Grid } from "lucide-react";
import { CreateDocumentButton } from "./create-document-button";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="p-24 gap-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My documents</h1>
        <CreateDocumentButton />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {documents?.map((doc) => (
          <DocumentCard document={doc} />
        ))}
      </div>

    </main>
  );
}
