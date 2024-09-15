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


const formSchema = z.object({
    title: z.string().min(1).max(100),
    file: z.instanceof(File),
})


export function UploadDocumentForm({ onUpload }: { onUpload: () => void }) {
    const createDocument = useMutation(api.documents.createDocument);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        await createDocument({
            title: values.title,
        })
        onUpload()
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
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            onChange(file)
                                        }
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