import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DashboardFilesButtons from "./components/buttons";
import { trpcServer } from "@/lib/trpc/server";
import { FileList } from "./components/file-list";

export default async function Dashboard() {
  const session = await trpcServer.users.getSession();
  if (session.user === null || session.user === undefined) {
    return null;
  }

  const fileList = await trpcServer.files.getUserFiles({ userId: session.user.id });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between text-xl">
          <span className="text-3xl">Your Files</span>
          <DashboardFilesButtons initialFiles={fileList} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Separator />
        <FileList initialFiles={fileList} />
      </CardContent>
    </Card>
  );
}
