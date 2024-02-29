import { File } from "@prisma/client";
import { FilePreview } from "./file-preview";
import FileDropdown from "./file-dropdown";
import { ClockIcon } from "lucide-react";

export function FileComponent({ file }: { file: File }) {
    function FormatDate(date: Date | undefined) {
        if (date === undefined) {
            return 'undefined';
        }

        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }

    return (
        <div className="w-60 h-60 items-center justify-center border border-input rounded-md">
            <div className="flex justify-between px-2 py-4">
                <div className="flex w-40 items-center gap-2 px-2">
                    <span className="truncate">{file.name}</span>
                </div>
                <div>
                    <FileDropdown file={file} />
                </div>
            </div>
            <FilePreview file={file} />
            <div className="px-2">
                <span>{FormatDate(file.uploadDate)}</span>
            </div>
        </div>
    )
}