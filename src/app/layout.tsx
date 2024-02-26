import "@/app/globals.css";
import type { Metadata } from "next";
//import { Noto_Sans } from "next/font/google";
import Header from "@/components/pages/header";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans"
import TRPCProvider from "@/app/(api)/_trpc/provider";
import { Toaster } from "@/components/ui/sonner";
//const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["500", "700", "100", "200", "300", "400", "600"] });
const geistSans = GeistSans;

export const metadata: Metadata = {
  title: "Vital",
  description: "Created With ❤️ by Resink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.className, "dark antialiased min-h-screen font-sans")}>
        <TRPCProvider>
          <Header />
          {children}
        </TRPCProvider>
        <Toaster />
      </body>
    </html>
  );
}
