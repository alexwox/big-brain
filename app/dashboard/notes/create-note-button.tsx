"use client";
import { Button } from "@/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { CreateNoteForm } from "./create-note-form"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CreateNoteButton() {
    const createDocument = useMutation(api.documents.createDocument);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                   <PlusIcon className="w-4 h-4" /> Create Note
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Note</DialogTitle>
                    <DialogDescription>
                        Write something helpful.
                    </DialogDescription>
                    <CreateNoteForm onNoteCreated={
                        () => {
                            setIsOpen(false);
                            toast({
                                title: "Note created",
                                description: "Your note has been created",
                            });
                        }
                    } />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}