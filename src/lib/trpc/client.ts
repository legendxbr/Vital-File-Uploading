import { trpc } from "@/app/(api)/_trpc/client";
import { httpBatchLink } from "@trpc/client";

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: process.env.NEXT_PUBLIC_APP_DOMAIN!.concat("/api/trpc")
        })
    ]
});