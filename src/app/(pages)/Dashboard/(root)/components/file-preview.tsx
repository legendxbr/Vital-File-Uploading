import { File } from "@prisma/client";
import { AppWindow, FileArchive, FileIcon } from "lucide-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export function FilePreview({ file }: { file: File }) {
    function GetPreview() {
        const [type, extension] = file.fileType.split('/');
        switch (type) {
            case "image":
                return (
                    <LazyLoadImage
                        className="max-h-32"
                        src={file.presignedUrl}
                    />
                )
            case "application":
                switch (extension) {
                    case "x-zip-compressed":
                        return <FileArchive size={64} />
                    case "x-msdownload":
                    case "octet-stream":
                        return <AppWindow size={64} />
                }
        }

        return (
            <FileIcon size={64} />
        )
    }


    return (
        <div className="flex items-center justify-center px-4 my-3 h-32">
            {
                GetPreview()
            }
        </div>
    )
}