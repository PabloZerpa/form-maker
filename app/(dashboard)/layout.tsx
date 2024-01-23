"use client"

import Logo from "@/components/Logo";
import ThemeButton from "@/components/ThemeButton";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

function DashboardLayout({ children }: { children: ReactNode }) {
    const { isSignedIn } = useUser();

    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
                <Logo />

                <div className="flex gap-4 items-center">
                    <ThemeButton />
                    
                    {isSignedIn ? 
                        (
                            <UserButton afterSignOutUrl="/sign-in" />
                        ) :
                        (
                            <SignInButton>
                                <button className="btn bg-blue-500 hover:bg-blue-400 text-slate-200">Sign in</button>
                            </SignInButton>
                        )
                    }
                    
                </div>
                
            </nav>
            <main className="flex w-full flex-grow h-full">{children}</main>
        </div>
    );
}
 
export default DashboardLayout;