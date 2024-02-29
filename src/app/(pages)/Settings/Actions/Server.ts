"use server"
import { trpcServer } from "@/lib/trpc/server";
import { SettingsSchema } from "../Types/SettingsSchema";

export async function UpdateProfileAction(prevState: any, values: FormData) {
    const session = await trpcServer.users.getSession();
    if (session.user === null || session.user === undefined) {
        return { success: false, error: 'Invalid session' };
    }

    const parse = await SettingsSchema.parseAsync({ username: values.get('username') as string })
        .then(data => data).catch(_ => undefined);
    if (parse === undefined) {
        return { success: false, error: 'Invalid fields' };
    }

    await trpcServer.users.updateUser({ userId: session.user.id, username: parse?.username });
    return { success: true, error: '' };
}