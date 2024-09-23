"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/app/dashboard/documents/document-card";
import { Grid } from "lucide-react";
import { UploadDocumentButton } from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className=" w-full gap-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My documents</h1>
        <UploadDocumentButton />
      </div>

      {!documents &&
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

      {documents && documents.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <Image 
            src="/documents.svg" 
            alt="Empty state" 
            width={300} 
            height={300} 
          />
          <h2 className="text-2xl font-bold">No documents found</h2>
          <p className="text-sm text-gray-500">
            Upload a document to get started.
          </p>
          <UploadDocumentButton />
        </div>
      )}

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
