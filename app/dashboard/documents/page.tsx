"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentCard } from "@/app/dashboard/documents/document-card";
import { UploadDocumentButton } from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";

export default function Home() {
  const organization = useOrganization();
  const documents = useQuery(api.documents.getDocuments, {
    orgId: organization.organization?.id
  });

  return (
    <main className=" w-full gap-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My documents</h1>
        <UploadDocumentButton />
      </div>

      {!documents &&
        <div className="grid grid-cols-4 gap-4">
          {new Array(8).fill(0).map((_, index) => (
            <Card key={index} className="p-6 flex flex-col gap-4 justify-between">
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
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      )}

    </main>
  );
}
