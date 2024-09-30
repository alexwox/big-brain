"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { buttonStyles, buttonIconStyles } from "@/styles/styles"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { LoadingButton } from "@/components/loading-button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteDocumentButton({ documentId }: { documentId: Id<"documents"> }) {
    const deleteDocument = useMutation(api.documents.deleteDocument)

    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button className={buttonStyles} variant="destructive">
                    <TrashIcon className={buttonIconStyles} /> Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your document
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton onClick={() => {
                        setIsLoading(true)
                        deleteDocument({
                            documentId
                        }).then (() => {
                            router.push("/dashboard/documents")
                        }).finally(() => {
                            setIsLoading(false)
                        })
                    }}
                    
                    isLoading={isLoading} loadingText="Deleting...">
                        Delete
                    </LoadingButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}