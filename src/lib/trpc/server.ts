import { appRouter } from '@/app/(api)/server'
import { createCallerFactory } from '@/app/(api)/server/trpc';
import 'server-only'

export const trpcServer = createCallerFactory(appRouter)(async () => {
    return {}
});