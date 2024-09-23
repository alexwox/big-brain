"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { MouseEvent, ReactNode } from "react"



export function LoadingButton({
    isLoading,
    children,
    loadingText,
    onClick
 } : {
    isLoading: boolean,
    children: React.ReactNode,
    loadingText: string,
    onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void 
}){
    return (
    <Button 
        className = "flex gap-2 items-center"
        type = "submit" 
        disabled = { isLoading }
        onClick={ (e) => {
            onClick?.(e);
        }}
    >
        { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
        { isLoading ? loadingText : children}
    </Button>)
}
