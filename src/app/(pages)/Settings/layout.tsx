import { Separator } from "@/components/ui/separator"
import { SideBar } from "@/components/ui/sidebar"
import { APP_ROUTES } from "@/utils/config"

const sidebarNavItems = [
    {
        title: "Profile",
        href: APP_ROUTES.private.settings,
    },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full px-20 py-10 flex flex-col gap-8">
            <div className="text-3xl font-bold">
                <span>Settings</span>
            </div>
            <Separator />
            <div className="flex gap-4">
                <SideBar items={sidebarNavItems} className="w-80" />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </main>
    )
}