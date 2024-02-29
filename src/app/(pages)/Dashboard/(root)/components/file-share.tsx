import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface FileShareProps {
    isOpen: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    fileId: string
}

export default function FileShare({ isOpen, setOpen, fileId }: FileShareProps) {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Your Share Link
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <Input type="text" value={window.location.origin + `/storage?fileId=${fileId}`} />
                </div>
            </DialogContent>
        </Dialog>
    )
}