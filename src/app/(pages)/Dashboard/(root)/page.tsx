import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageIcon } from "lucide-react";
import DashboardFilesButtons from "./buttons";
import { trpcServer } from "@/lib/trpc/server";

export default async function Dashboard() {
  const session = await trpcServer.users.getSession();
  if (session.user === null || session.user === undefined) {
    return null;
  }

  const files = await trpcServer.files.getUserFiles({ userId: session.user.id });
  return (
    <Card>
      <CardHeader><CardTitle className="text-xl">Your Files</CardTitle></CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Separator />
        <DashboardFilesButtons />
        <div className="grid grid-cols-8 gap-4">
          {
            files.files.map(file => (
              <div key={file.id} className="flex flex-col min-w-28 h-28 items-center justify-center border border-input rounded-md">
                <ImageIcon size={32} />
                <span>{file.name}</span>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
}
