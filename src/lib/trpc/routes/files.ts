import { minioClient } from "@/lib/minio";
import { publicProcedure, router } from "../../../app/(api)/server/trpc";
import prisma from "@/utils/prisma";
import z from "zod"
import { GetSession } from "@/utils/session";

export const filesRouter = router({
    generatePresignedUrl: publicProcedure
        .input(z.object({
            fileName: z.string(),
            fileType: z.string(),
            fileSize: z.number()
        }))
        .mutation(async ({ input }) => {
            const { fileName, fileType, fileSize } = input;
            const userSession = await GetSession();
            if (userSession === undefined) {
                return { error: 'Failed #1' };
            }

            const user = await prisma.user.findFirst({
                where: {
                    id: userSession.payload.value as string
                }
            }).then(data => data).catch(_ => null);
            if (user === null) {
                return { error: 'Failed #2' };
            }

            const nameInBucket = user.username.concat('-').concat(fileName);
            const fileId = crypto.randomUUID();
            const objectName = fileId.concat('-').concat(nameInBucket);
            const presignedPutUrl = await minioClient.presignedPutObject(process.env.MINIO_BUCKET_NAME as string, objectName, 24 * 60 * 60)
                .then(data => data).catch(_ => undefined);
            if (presignedPutUrl === undefined) {
                return { error: 'Failed #3' };
            }

            const presignedUrlGet = await minioClient.presignedGetObject(process.env.MINIO_BUCKET_NAME as string, objectName)
                .then(data => data).catch(_ => undefined);
            const newFile = await prisma.file.create({
                data: {
                    id: fileId,
                    name: fileName,
                    nameInBucket: nameInBucket,
                    fileType: fileType,
                    sizeInBytes: fileSize,
                    userId: user.id,
                    presignedUrl: presignedUrlGet
                }
            }).then(data => data).catch(_ => null);
            if (newFile === null) {
                return { error: 'Cannot send data' };
            }

            return { presignedUrl: presignedPutUrl };
        }),
    getUserFiles: publicProcedure
        .input(z.object({
            userId: z.string().optional()
        }))
        .query(async ({ input }) => {
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
    deleteUserFile: publicProcedure
        .input(z.object({
            fileId: z.string()
        }))
        .mutation(async ({ input }) => {
            const userSession = await GetSession();
            if (userSession === undefined) {
                return { error: 'Failed to load data' };
            }

            const file = await prisma.file.findFirst({
                where: {
                    id: input.fileId
                }
            }).then(data => data).catch(_ => null);
            if (file === null) {
                return { error: 'Failed to find File' };
            }

            const objectName = file.id.concat('-').concat(file.nameInBucket);
            await minioClient.removeObject(process.env.MINIO_BUCKET_NAME as string, objectName)
                .then(data => data).catch(error => {
                    console.log(error);
                    return undefined;
                });

            await prisma.file.delete({
                where: {
                    id: file.id
                }
            });
            return { success: true };
        })
})