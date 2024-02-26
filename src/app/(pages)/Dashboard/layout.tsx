import { Separator } from "@/components/ui/separator"
import { SideBar } from "./sidebar"
import { APP_ROUTES } from "@/utils/config"

const sidebarNavItems = [
    {
        title: "Files",
        href: APP_ROUTES.private.dashboard,
    },
    {
        title: "Recents",
        href: APP_ROUTES.private.dashboard.concat("/Recents"),
    },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="w-full px-20 py-10 flex flex-col gap-8">
                <div className="text-3xl font-bold">
                    <span>Dashboard</span>
                </div>
                <Separator />
                <div className="flex gap-4">
                    <SideBar items={sidebarNavItems} className="w-80" />
                    <div className="flex-1">
                        {children}
                    </div>

                </div>
            </main>
        </>
    )
}