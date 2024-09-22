'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/ui/document-card";
import { Grid } from "lucide-react";
import { UploadDocumentButton } from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="p-24 gap-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My documents</h1>
        <UploadDocumentButton />
      </div>

      {documents === undefined &&
      <div className="grid grid-cols-4 gap-4">
        {new Array(8).fill(0).map((_, index) => (
          <Card className="p-6 flex flex-col gap-4 justify-between">
            <Skeleton className=" h-[20px] rounded-lg" />
            <Skeleton className=" h-[20px] rounded-lg" />
            <Skeleton className=" h-[20px] rounded-lg" />
            <Skeleton className=" w-[170px] h-[40px] rounded-lg" />
          </Card>
        ))}


        </div>
      }


      {documents && documents.length > 0 && (
      <div className="grid grid-cols-4 gap-4">
        {documents?.map((doc) => (
          <DocumentCard document={doc} />
        ))}
      </div>
      )}

    </main>
  );
}
