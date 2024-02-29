'use client'
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthSchema } from "@/app/(pages)/Authentication/Types/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAction } from "../Actions/Server";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import AuthenticationInputs from "./Inputs/Inputs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/utils/config";

export default function RegistrationTab() {
    const { register } = useForm<z.infer<typeof AuthSchema>>({
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const router = useRouter();
    const [state, formAction] = useFormState(RegisterAction, { success: false, error: '' });
    useEffect(() => {
        if (state.error) {
            toast.error(state.error);
        }
        else if (state.success) {
            router.push(APP_ROUTES.private.dashboard);
        }
    }, [state, router]);
    return (
        <form action={formAction}>
            <Card className="w-full">
                <CardContent className="flex flex-col items-center gap-6 py-4">
                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-xl font-bold">Create an account</span>
                        <span className="text-muted-foreground">Enter your data below to create your account</span>
                    </div>
                    <AuthenticationInputs register={register} />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        <span>By clicking continue, you agree to our</span>
                        {" "}
                        <span className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </span>
                        {" "}
                        <span>and</span>
                        {" "}
                        <span className="underline underline-offset-4 hover:text-primary" >
                            Privacy Policy.
                        </span>
                    </p>

                </CardContent>
            </Card>
        </form>
    )
}