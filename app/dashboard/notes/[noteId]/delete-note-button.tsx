"use client"

import {
    AlertDialog,
    AlertDialogAction,
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
import { Trash } from "lucide-react"
export function DeleteNoteButton({ noteId }: { noteId: Id<"notes"> }) {
    const deleteNote = useMutation(api.notes.deleteNote)

    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant={"destructive"} className="absolute top-0 right-0">
                    <Trash />
                </Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your noteId
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton onClick={() => {
                        setIsLoading(true)
                        deleteNote({
                            noteId
                        }).then(() => {
                            router.push("/dashboard/notes")
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