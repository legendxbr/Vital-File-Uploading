'use client'
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "@/utils/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderLinkProps {
    text: string,
    link: string
}

export default function HeaderLink(props: HeaderLinkProps) {
    const pathName = usePathname();
    return (
        <>
            <div className={cn(pathName.startsWith(props.link) ? '' : 'text-muted-foreground hover:text-zinc-50', "text-sm transition-colors")}>
                <Link href={props.link}><span>{props.text}</span></Link>
            </div>
        </>
    )
}