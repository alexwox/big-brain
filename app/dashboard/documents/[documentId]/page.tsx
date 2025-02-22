"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDocumentButton } from "./delete-document-button";

export default function DocumentPage({
  params,
}: {
  params: { documentId: Id<"documents"> };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  return (
    <main className="flex-1 overflow-y-auto px-2 sm:px-4">
      <div className="max-w-[1800px] mx-auto w-full p-4 sm:p-6 space-y-4 sm:space-y-6">
        {!document && (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <Skeleton className="h-8 w-[200px] sm:w-[300px]" />
              <Skeleton className="h-8 w-8" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-8 w-[80px] sm:w-[100px]" />
              <Skeleton className="h-8 w-[80px] sm:w-[100px]" />
            </div>
            <Skeleton className="w-full h-[500px] sm:h-[700px] rounded-xl" />
          </div>
        )}

        {document && (
          <>
            <div className="flex justify-between items-center px-2">
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                {document.title}
              </h1>
              <DeleteDocumentButton documentId={document._id} />
            </div>

            <Tabs defaultValue="document" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="document">Document</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="document">
                <div className="rounded-xl p-2 sm:p-4 flex-1 h-[500px] sm:h-[700px] border-2 border-slate-200 dark:border-slate-800">
                  {document.documentUrl && (
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={document.documentUrl}
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <div className="h-[500px] sm:h-[700px]">
                  <ChatPanel documentId={document._id} />
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </main>
  );
}
