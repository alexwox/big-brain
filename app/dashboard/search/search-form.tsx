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
import { searchAction } from "@/convex/search";
import { Doc } from "@/convex/_generated/dataModel";

const formSchema = z.object({
    search: z.string().min(1).max(1000),
})

export function SearchForm({ setResults }: { setResults: (results: typeof api.search.searchAction._returnType) => void }) {
    const searchAction = useAction(api.search.searchAction);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await searchAction({ search: values.search }).then(setResults);
        
        form.reset();
    }

    return (
    <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-1 gap-2">
            <FormField
                
                control={form.control}
                name="search"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl >
                            <Input placeholder="Search over your documents and notes" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <LoadingButton
                isLoading={form.formState.isSubmitting}
                loadingText="Searching..."
            >
                Search
            </LoadingButton>
        </form>
    </Form>
)}
