import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import { minioClient } from "@/lib/minio";

async function Handler(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const fileId = params.get('fileId') as string;
    if (fileId === undefined) {
        return NextResponse.json({ error: 'Missing file ID' });
    }

    const file = await prisma.file.findFirst({
        where: {
            id: fileId
        }
    }).then(data => data).catch(_ => null);
    if (file === null) {
        return NextResponse.json({ error: 'Cannot find file' });
    }

    const objectName = file.id.concat('-').concat(file.nameInBucket);
    const presignedUrlGet = await minioClient.presignedGetObject(process.env.MINIO_BUCKET_NAME as string, objectName, 60)
        .then(data => data).catch(_ => undefined);
    if (presignedUrlGet === undefined) {
        return NextResponse.json({ error: 'Cannot create a valid link' });
    }

    return NextResponse.redirect(presignedUrlGet);
}

export const POST = Handler;
export const GET = Handler;