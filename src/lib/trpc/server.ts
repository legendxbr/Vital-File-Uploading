import { appRouter } from '@/app/(api)/server'
import { createCallerFactory } from '@/app/(api)/server/trpc';
import { GetSession } from '@/utils/session';
import 'server-only'

export const trpcServer = createCallerFactory(appRouter)(async () => {
    const session = await GetSession();
    return { session }
});