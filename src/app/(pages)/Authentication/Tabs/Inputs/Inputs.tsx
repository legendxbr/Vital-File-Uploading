import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

export default function AuthenticationInputs({ register }: { register: any }) {
    const { pending } = useFormStatus();
    return (
        <div className="flex flex-col gap-2 w-96">
            <Input disabled={pending} autoComplete="off" type="email" placeholder="user@email.com" {...register('email')} />
            <Input disabled={pending} autoComplete="off" type="password" placeholder="********" {...register('password')} />
            <Button disabled={pending} type="submit">Authenticate</Button>
        </div>
    )
}