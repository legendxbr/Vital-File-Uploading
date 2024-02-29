import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { trpcServer } from "@/lib/trpc/server";
import { SettingsInputs } from "./input";

export default async function Settings() {
    const session = await trpcServer.users.getSession();
    if (session.user === null || session.user === undefined) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between text-xl">
                    <span className="text-3xl">Your Profile</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Separator />
                <SettingsInputs user={session.user} />
            </CardContent>
        </Card>
    );
}
