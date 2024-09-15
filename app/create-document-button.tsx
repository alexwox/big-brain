import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "../convex/_generated/api"
import { UploadDocumentForm } from "./upload-document-form"
import { useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function CreateDocumentButton() {
    const createDocument = useMutation(api.documents.createDocument);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button> Upload Document</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                    Upload a document to get started.
                </DialogDescription>
                <UploadDocumentForm onUpload={() => setIsOpen(false)}/>
                </DialogHeader>
            </DialogContent>
            </Dialog>
        
    )
}