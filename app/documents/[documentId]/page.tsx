'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function DocumentPage(
  { params }: { params: { documentId: Id<"documents"> } }
) {
  const createDocument = useMutation(api.documents.createDocument);

  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId
  });

  return (
    <main className="p-24 gap-6 space-y-6">
      {!document && 
      <div className="space-y-8">
        <div className="flex justify-between">
          <Skeleton className="w-[500px] h-[30px]" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-[100px] h-[30px]" />
        </div>
        <Skeleton className="w-full h-[700px] rounded-xl" />
      </div>

      }

      {document && (<>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold"> {document.title} </h1>
        </div>

        <div className="flex gap-12">
          <Tabs defaultValue="document" className="w-full" >
            <TabsList className="mb-2">
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="document">
              <div className="
            bg-gray-200 dark:bg-gray-900 rounded-xl p-4 flex-1 h-[700px]
            border-2 border-slate-200 dark:border-slate-600">
                {document.documentUrl && <iframe
                  className="w-full h-full"
                  src={document.documentUrl} />}
              </div>
            </TabsContent>
            <TabsContent value="chat">
              <ChatPanel documentId={document._id} />
            </TabsContent>
          </Tabs>
        </div>
      </>)}
    </main>
  );
}
