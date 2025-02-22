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
    orgId: organization.organization?.id,
  });

  return (
    <main className="flex-1 overflow-y-auto px-2 sm:px-4">
      <div className="max-w-[1800px] mx-auto w-full p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <h1 className="text-xl sm:text-2xl font-bold">My documents</h1>
          <UploadDocumentButton />
        </div>

        {!documents && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {new Array(8).fill(0).map((_, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 flex flex-col gap-4 justify-between"
              >
                <Skeleton className="h-[20px] rounded-lg" />
                <Skeleton className="h-[20px] rounded-lg" />
                <Skeleton className="h-[20px] rounded-lg" />
                <Skeleton className="w-full sm:w-[170px] h-[40px] rounded-lg" />
              </Card>
            ))}
          </div>
        )}

        {documents && documents.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-8 sm:py-12">
            <Image
              src="/documents.svg"
              alt="Empty state"
              width={200}
              height={200}
              className="w-[200px] sm:w-[300px] h-auto"
              priority
            />
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              No documents found
            </h2>
            <p className="text-sm text-gray-500 text-center px-4">
              Upload a document to get started.
            </p>
            <UploadDocumentButton />
          </div>
        )}

        {documents && documents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documents?.map((doc) => (
              <DocumentCard key={doc._id} document={doc} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
