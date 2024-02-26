import { Input } from "@/components/ui/input";
import { trpcServer } from "@/lib/trpc/server";
import { APP_ROUTES } from "@/utils/config";
import { DatabaseZapIcon } from "lucide-react";
import Link from "next/link";
import HeaderLink from "./header-links";
import Avatar from "../ui/avatar";

export default async function Header() {
    const session = await trpcServer.users.getSession();
    return (
        <header className="w-full border-b select-none">
            <div className="flex justify-between items-center px-20 py-2">
                <div className="flex gap-4 items-center text-lg">
                    <span><DatabaseZapIcon size={20} /></span>
                    <Link href={APP_ROUTES.public.home}><span>Vital</span></Link>
                    <span className="border-l h-6 space-x-4" />
                    <HeaderLink link={APP_ROUTES.private.dashboard} text="Dashboard" />
                    <HeaderLink link={APP_ROUTES.private.settings} text="Settings" />
                </div>
                <div className="flex gap-4 items-center">
                    <Input type="text" placeholder="Search File..." className="h-8" />
                    {
                        session.user && (
                            <>
                                <span className="border-l h-6 space-x-4" />
                                <div className="min-w-6 min-h-6">
                                    <Avatar user={session.user.username} size={24} radius={16} />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </header>
    )
}