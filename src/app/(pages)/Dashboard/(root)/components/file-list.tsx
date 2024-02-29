'use client'
import { trpc } from "@/app/(api)/_trpc/client";
import { FileComponent } from "./file";
import { trpcServer } from "@/lib/trpc/server";

export function FileList({ initialFiles, userId }:
    { initialFiles: Awaited<ReturnType<(typeof trpcServer)["files"]["getUserFiles"]>>, userId: string }) {
    const filesArray = trpc.files.getUserFiles.useQuery({ userId }, {
        initialData: initialFiles,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    });
    return (
        <div className="flex flex-wrap gap-4">
            {
                filesArray.data?.files.map(file => (
                    <FileComponent key={file.id} file={file} />
                ))
            }
        </div>
    )
}