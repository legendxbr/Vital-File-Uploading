'use client'
import { File } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DownloadIcon, MoreVertical, Share2Icon, TrashIcon } from "lucide-react";
import { trpc } from "@/app/(api)/_trpc/client";
import { toast } from "sonner";
import FileShare from "./file-share";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FileDropdown({ file }: { file: File }) {
    const userFiles = trpc.files.getUserFiles.useQuery({}, { refetchOnMount: false, refetchOnReconnect: false });
    const deleteFile = trpc.files.deleteUserFile.useMutation({ onSettled: () => { userFiles.refetch(); } });
    const [shareDialogOpen, setShareDialogOpen] = useState(false);

    const router = useRouter();
    function DownloadObject() {
        router.push(`/storage?fileId=${file.id}`);
    }

    function DeleteObject() {
        toast.promise(async () => {
            await deleteFile.mutateAsync({ fileId: file.id });
            return toast.success('File Deleted');
        }, {
            loading: 'Deleting File...',
        });
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={DownloadObject} className="gap-2">
                            <DownloadIcon size={16} />
                            Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShareDialogOpen(true)} className="gap-2">
                            <Share2Icon size={16} />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2" onClick={DeleteObject}>
                            <TrashIcon size={16} />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <FileShare isOpen={shareDialogOpen} setOpen={setShareDialogOpen} fileId={file.id} />
        </>
    )
}