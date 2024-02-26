"use client"
import { trpcClient } from "@/lib/trpc/client"
import { trpc } from "./client"
import { queryClient } from "@/lib/query"
import { QueryClientProvider } from "@tanstack/react-query"

export default function TRPCProvider({ children }: { children: React.ReactNode }) {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}