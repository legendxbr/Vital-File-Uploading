import { appRouter } from '@/app/(api)/server'
import { createCallerFactory } from '@/app/(api)/server/trpc';
import 'server-only'

export const trpcServer = createCallerFactory(appRouter)(async () => {
    /*Send Context, maybe i will need to use GetSession function here but im too lazy now*/
    return {}
});