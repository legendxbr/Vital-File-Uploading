import { GetSession } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import { EventAction } from "./events";

async function Handler(request: NextRequest) {
    const payload = await request.formData();
    const userSession = await GetSession();
    if (userSession === undefined) {
        return NextResponse.json({ error: 'Failed to load data' }, { status: 200 });
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userSession.payload.value as string
        }
    }).then(data => data).catch(_ => null);
    if (user === null) {
        return NextResponse.json({ error: 'Cannot read data' }, { status: 200 });
    }

    switch (payload.get('type')) {
        case 'upload':
            return await EventAction.PutObject(payload, user);
    }
}

export const POST = Handler;