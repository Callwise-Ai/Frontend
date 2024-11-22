"use client"
import Link from "next/link";
import {
    LayoutDashboard,
    PlusCircle,
    Phone,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // Utility to conditionally combine class names
import { useUser } from "@clerk/nextjs";
export default function Sidebar() {
    const { user } = useUser();
    return (
        <aside className={cn(
            "fixed z-40 h-full w-64",
            "bg-gray-800 border-r border-gray-700", // Darker background and border
            "flex flex-col items-start py-6 overflow-hidden",
            "dark:bg-black/20 dark:border-gray-800"
        )}>
            <div className="px-4 mb-8 w-full flex items-center">
                <div className="text-white text-3xl font-bold pl-5 font-mono">
                    CALLWISE
                </div>
            </div>

            <nav className="w-full space-y-2 px-2">
                <SidebarItem
                    href="/Dashboard"
                    icon={<LayoutDashboard className="h-5 w-5 text-white" />}
                    label="Dashboard"
                />
                <SidebarItem
                    href="/create-project"
                    icon={<PlusCircle className="h-5 w-5 text-white" />}
                    label="Create Project"
                />
                <SidebarItem
                    href="/Dashboard/CallBot"
                    icon={<Phone className="h-5 w-5 text-white" />}
                    label="Call Bot"
                />
            </nav>

            <div className="flex-grow"></div>

            <div className="w-full px-2 space-y-2 mt-auto">
                <div className="w-full flex items-center px-2 py-4 space-x-3">
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonAvatarBox: {
                                    width: '48px',
                                    height: '48px',
                                    border: '2px solid #ffffff',
                                },
                                userButtonTrigger: {
                                    borderRadius: '50%',
                                    border: '2px solid transparent',
                                    transition: 'border-color 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#4a90e2',
                                    },
                                },
                            },
                        }}
                    />
                    {user && (
                        <div className="text-white">
                            {user.fullName || user.username || user.emailAddresses[0]?.emailAddress}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

function SidebarItem({ href, icon, label }: { href: string; icon: JSX.Element; label: string }) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className={cn(
                            "group w-full flex items-center py-2 px-3 rounded-md",
                            "hover:bg-accent/10 transition-colors duration-200",
                            "text-gray-200 hover:text-white"
                        )}
                    >
                        <div className="flex items-center space-x-3 w-full">
                            <span className="flex-shrink-0">{icon}</span>
                            <span className="opacity-100 whitespace-nowrap transition-opacity duration-300">
                                {label}
                            </span>
                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="dark:bg-gray-900 dark:text-gray-200">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
