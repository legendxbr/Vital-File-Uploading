"use server"
import { trpcServer } from "@/lib/trpc/server";

export async function UpdateProfileAction(prevState: any, values: FormData) {
    const session = await trpcServer.users.getSession();
    if (session.user === null || session.user === undefined) {
        return { success: false, error: 'Invalid session' };
    }

    const username = values.get('username') as string;
    await trpcServer.users.updateUser({ userId: session.user.id, username: username });
    return { success: true, error: '' };
}