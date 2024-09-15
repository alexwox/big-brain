"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function LoadingButton( { isLoading, children, loadingText } : { isLoading: boolean, children: React.ReactNode, loadingText: string }){
    return (
    <Button 
        className = "flex gap-2 items-center"
        type = "submit" 
        disabled = { isLoading }
        >
        { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
        { isLoading ? loadingText : children}
    </Button>)
}
