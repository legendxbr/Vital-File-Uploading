import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/app/(api)/server";

function Handler(req: Request) {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => ({})
    });
}

export const POST = Handler;
export const GET = Handler;