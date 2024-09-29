"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/loading-button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { generateUploadUrl } from "@/convex/documents";
import { Id } from "@/convex/_generated/dataModel";
import { useOrganization } from "@clerk/nextjs";

const formSchema = z.object({
    title: z.string().min(1).max(100),
    file: z.instanceof(File),
})


export function UploadDocumentForm({ onUpload }: { onUpload: () => void }) {
    const organization = useOrganization();
    const createDocument = useMutation(api.documents.createDocument);
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = await generateUploadUrl();
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": values.file.type },
            body: values.file,
        });
        const {storageId} = await result.json();

        await createDocument({
            title: values.title,
            fileId: storageId as Id<"_storage">,
            orgId: organization.organization?.id,
        })
        onUpload();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Expense Report" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <Input type="file" {...fieldProps}
                                    accept=".pdf,.docx,.txt,.md"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        onChange(file)
                                        
                                    }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    isLoading={form.formState.isSubmitting}
                    loadingText="Uploading..."
                >
                    Upload
                </LoadingButton>
            </form>
        </Form>
    )
}