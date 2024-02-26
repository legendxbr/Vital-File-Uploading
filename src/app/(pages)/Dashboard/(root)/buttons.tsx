'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpFromLineIcon, FolderPlusIcon } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import axios from "axios";
import { APP_ROUTES } from "@/utils/config";
import { toast } from "sonner";

export default function DashboardFilesButtons() {
    const fileInput = useRef(null);
    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files === null) {
            return;
        }

        const file = event.target.files[0];
        if (file === undefined) {
            return;
        }

        toast.promise(async () => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'upload');
            const response = await axios.post(APP_ROUTES.api.root.concat("/storage"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status !== 200) {
                return Promise.reject('Failed Request');
            }

            if (response.data.error) {
                return Promise.reject(response.data.error);
            }

            return 'File successfully uploaded'
        }, {
            loading: 'Sending Data...',
            success(data) {
                return data;
            },
            error(error) {
                return error;
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
            <Button variant={'outline'} className="flex flex-col w-20 h-20" onClick={handleClick} >
                <ArrowUpFromLineIcon />
                Upload
            </Button>
            <Button variant={'outline'} className="flex flex-col w-20 h-20">
                <FolderPlusIcon />
                Folder
            </Button>

            <Input ref={fileInput} onChange={handleChange} type="file" className="hidden" />
        </div>
    )
}