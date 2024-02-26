'use client'
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function SideBar({ className, items, ...props }: SideBarProps) {
    const pathname = usePathname();
    return (
        <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
            {
                items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:bg-transparent hover:underline",
                            "justify-start"
                        )}
                    >
                        {item.title}
                    </Link>
                ))
            }

        </nav>
    )
}