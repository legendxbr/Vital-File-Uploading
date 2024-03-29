import { publicProcedure, router } from "../../../app/(api)/server/trpc";
import { AuthSchema } from "@/app/(pages)/Authentication/Types/AuthSchema";
import { createHash } from "crypto";
import { DestroySession, GetSession, SetSession } from "@/utils/session";
import prisma from "@/utils/prisma";
import { z } from "zod";

export const usersRouter = router({
    createUser: publicProcedure
        .input(AuthSchema)
        .mutation(async ({ input }) => {
            const { email, password } = input;

            const hash = createHash('sha256').update(password).digest('hex');
            const [username] = email.split("@");
            const createdUser = await prisma.user.create({
                data: {
                    email: input.email,
                    password: hash,
                    username: username
                }
            }).then(data => data).catch(_ => undefined);
            if (createdUser === undefined) {
                return { error: 'User already registered' };
            }

            SetSession(createdUser.id);
            return { success: true };
        }),
    loginUser: publicProcedure
        .input(AuthSchema)
        .query(async ({ input }) => {
            const { email, password } = input;
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            }).then(data => data).catch(_ => null);

            if (user === null) {
                return { error: "User not exists" }
            }

            const hash = createHash('sha256').update(password).digest('hex');
            if (user.password !== hash) {
                return { error: "Password incorrect" };
            }

            SetSession(user.id);
            return { success: true };
        }),
    updateUser: publicProcedure
        .input(z.object({
            userId: z.string(),
            username: z.string().optional()
        }))
        .mutation(async ({ input, ctx }) => {
            const { session } = ctx as any;
            if (session === undefined) {
                return { error: 'session' };
            }

            await prisma.user.update({
                where: {
                    id: input.userId
                },
                data: {
                    username: input.username
                }
            });

            return { success: true };
        }),
    getSession: publicProcedure
        .query(async ({ ctx }) => {
            const { session } = ctx as any;
            if (session === undefined) {
                return { error: 'session' };
            }
            const userId = session.payload.value as string;
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            }).then(data => data).catch(_ => null);
            if (user === null) {
                return { error: 'user' };
            }

            return { user };
        }),
    clearSession: publicProcedure
        .query(async () => {
            await DestroySession();
        })
})