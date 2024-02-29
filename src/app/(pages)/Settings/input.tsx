'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SettingsSchema } from "./Types/SettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UpdateProfileAction } from "./Actions/Server";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SettingsInputs({ user }: { user: User }) {
    const { register } = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            username: user.username
        }
    });

    const router = useRouter();
    const [state, formAction] = useFormState(UpdateProfileAction, { success: false, error: '' });
    useEffect(() => {
        if (state.error) {
            toast.error(state.error);
        } else if (state.success) {
            toast.success("Profile updated");
            router.refresh();
        }
    }, [router, state]);
    return (
        <form action={formAction} className="flex flex-col gap-2 w-1/4">
            <div className="flex flex-col gap-2">
                <Label className="text-lg">Username</Label>
                <Input type="text" {...register('username')} />
            </div>

            <Button className="w-2/4">Update Profile</Button>
        </form>
    )
}