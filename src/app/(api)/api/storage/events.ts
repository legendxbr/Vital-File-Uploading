import { User } from "@prisma/client";
import { minioClient } from "@/lib/minio";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"

async function PutObject(payload: FormData, user: User) {
    const file = payload.get('file') as File;
    const newFile = await prisma.file.create({
        data: {
            name: file.name,
            nameInBucket: user.username.concat('-').concat(file.name),
            fileType: file.type,
            sizeInBytes: file.size,
            userId: user.id
        }
    }).then(data => data).catch(_ => null);
    if (newFile === null) {
        return NextResponse.json({ error: 'Cannot send data' }, { status: 200 });
    }

    const objectName = newFile.id.concat('-').concat(newFile.nameInBucket);
    const buffer = Buffer.from(await file.arrayBuffer());
    const response = await minioClient.putObject('vital', objectName, buffer, undefined, {
        'Content-Type': file.type,
    })
        .then(data => data).catch(error => {
            console.log(error);
            return undefined;
        });
    if (response === undefined) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 200 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}

export const EventAction = {
    PutObject
}