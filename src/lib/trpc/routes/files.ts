import { publicProcedure, router } from "../../../app/(api)/server/trpc";
import prisma from "@/utils/prisma";
import z from "zod"

export const filesRouter = router({
    getUserFiles: publicProcedure
        .input(z.object({
            userId: z.string()
        }))
        .mutation(async ({ input }) => {
            const files = await prisma.file.findMany({
                where: {
                    userId: input.userId
                }
            }).then(data => data).catch(_ => null);
            if (files === null) {
                return { files: [] };
            }

            return { files };
        }),
})