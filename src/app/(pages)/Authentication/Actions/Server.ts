"use server"
import { trpcServer } from "@/lib/trpc/server"
import { setTimeout } from "timers/promises";
import { AuthSchema } from "../Types/AuthSchema";
export async function RegisterAction(prevState: any, values: FormData) {
    const parse = await AuthSchema.parseAsync({ email: values.get('email') as string, password: values.get('password') as string })
        .then(data => data).catch(_ => undefined);
    if (parse === undefined) {
        return { success: false, error: 'Invalid Fields' };
    }

    await setTimeout(1000);
    const createUser = await trpcServer.users.createUser({ email: parse.email, password: parse.password });
    return { success: createUser.success, error: createUser.error };
}

export async function LoginAction(prevState: any, values: FormData) {
    const parse = await AuthSchema.parseAsync({ email: values.get('email') as string, password: values.get('password') as string })
        .then(data => data).catch(_ => undefined);
    if (parse === undefined) {
        return { success: false, error: 'Invalid Fields' };
    }

    await setTimeout(1000);
    const loginUser = await trpcServer.users.loginUser({ email: parse.email, password: parse.password });
    return { success: loginUser.success, error: loginUser.error };
}