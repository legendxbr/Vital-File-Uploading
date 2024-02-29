'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpFromLineIcon, FolderPlusIcon, Info } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { APP_ROUTES } from "@/utils/config";
import { toast } from "sonner";
import { trpc } from "@/app/(api)/_trpc/client";
import { trpcServer } from "@/lib/trpc/server";

export default function DashboardFilesButtons({ initialFiles }: { initialFiles: Awaited<ReturnType<(typeof trpcServer)["files"]["getUserFiles"]>> }) {
    const getFiles = trpc.files.getUserFiles.useQuery({}, {
        initialData: initialFiles,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    const generateUrl = trpc.files.generatePresignedUrl.useMutation();
    const fileInput = useRef(null);
    const [percentage, setPercentage] = useState(0);
    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files === null) {
            return;
        }

        const file = event.target.files[0];
        if (file === undefined) {
            return;
        }

        generateUrl.mutate({ fileName: file.name, fileType: file.type, fileSize: file.size }, {
            onSuccess: async (data: { error?: string, presignedUrl?: string }) => {
                if (data.error) {
                    return toast.error("Failed to create file");
                }

                if (data.presignedUrl === undefined) {
                    return toast.error("Failed to create file");
                }

                await axios.put(data.presignedUrl, file, {
                    onUploadProgress: (event) => {
                        let progress: number = Math.round(
                            (event.loaded * 100) / event.total!
                        );

                        setPercentage(progress);
                    },
                });

                getFiles.refetch();
                setPercentage(0);
                return toast.success('File successfully uploaded');
            },
        });
    }

    function handleClick() {
        if (fileInput.current === null) {
            return;
        }

        const current = fileInput.current as HTMLInputElement;
        current.click();
    }

    return (
        <div className="flex gap-2">
            <Button className="flex gap-2" onClick={handleClick} disabled={percentage > 0} >
                <ArrowUpFromLineIcon size={16} />
                {
                    percentage > 0 ? `Uploading (${percentage}%)` : 'Upload'
                }
            </Button>
            <Input ref={fileInput} onChange={handleChange} type="file" className="hidden" />
        </div>
    )
}