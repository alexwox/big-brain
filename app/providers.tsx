"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export function Providers({ children }: { children: React.ReactNode }) {
  return (

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      {() => ({
        const { resolvedTheme } = useTheme();
        return( 
          <ClerkProvider 
               publishableKey = { process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string }
         >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkProvider>)}
      )}

    </ThemeProvider >

)}