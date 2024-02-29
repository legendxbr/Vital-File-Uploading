import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/utils/config";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function IndexPage() {
    return (
        <main className="w-full py-52">
            <div className="flex flex-col gap-8 justify-center items-center">
                <span className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">Simplified File Sharing</span>
                <span className="flex flex-col text-center text-lg text-muted-foreground sm:text-xl">
                    <span>Securely store your files in the cloud and access them from anywhere, anytime.</span>
                    <span>Try it now and experience the convenience firsthand.</span>
                </span>
                <div className="flex gap-4">
                    <Link href={APP_ROUTES.private.dashboard}><Button>Get Started</Button></Link>
                    <Link href="https://github.com/legendxbr/Vital-File-Uploading"><Button className="flex gap-2" variant='outline'><GitHubLogoIcon /> Github</Button></Link>
                </div>
            </div>
        </main>
    )
}