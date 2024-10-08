"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { LoadingButton } from "@/components/loading-button"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useOrganization } from "@clerk/nextjs";

import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    text: z.string().min(1).max(2500),
})


export function CreateNoteForm({ onNoteCreated }: { onNoteCreated: () => void }) {
    const createNote = useMutation(api.notes.createNote);
    const organization = useOrganization();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createNote({
            text: values.text,
            orgId: organization.organization?.id,
        })
        
        onNoteCreated();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Textarea rows={10} placeholder="Your note" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton
                    isLoading={form.formState.isSubmitting}
                    loadingText="Creating..."
                >
                    Create
                </LoadingButton>
            </form>
        </Form>
    )
}