'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/loading-button";

const formSchema = z.object({
    text: z.string().min(1).max(1000),
})

export function QuestionForm({ documentId }: { documentId: Id<"documents">}) {
    const askQuestion = useAction(api.documents.askQuestion);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await askQuestion({ question: values.text, documentId: documentId });
        form.reset();
    }

    return (
    <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-1 gap-2">
            <FormField
                
                control={form.control}
                name="text"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl >
                            <Input placeholder="Ask anything about the document" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <LoadingButton
                isLoading={form.formState.isSubmitting}
                loadingText="Submitting..."
            >
                Submit
            </LoadingButton>
        </form>
    </Form>
)}
