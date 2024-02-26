import { trpc } from "@/app/(api)/_trpc/client";
import { httpBatchLink } from "@trpc/client";

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/api/trpc"
        })
    ]
});