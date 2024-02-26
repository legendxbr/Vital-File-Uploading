import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegistrationTab from "@/app/(pages)/Authentication/Tabs/Registration";
import LoginTab from "@/app/(pages)/Authentication/Tabs/LogIn";

export default function AuthenticationPage() {
    return (
        <main className="w-full flex justify-center py-52">
            <Tabs defaultValue="account" className="w-128">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Log In</TabsTrigger>
                    <TabsTrigger value="register">Sign In</TabsTrigger>
                </TabsList>
                <TabsContent value="register">
                    <RegistrationTab />
                </TabsContent>
                <TabsContent value="account">
                    <LoginTab />
                </TabsContent>
            </Tabs>
        </main>
    )
}