// import Link from "next/link"
// import {
//     LayoutDashboard,
//     PlusCircle,
//     Settings,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { UserButton } from "@clerk/nextjs"
// import { cn } from "@/lib/utils"

// export default function Sidebar() {
//     return (
//         <aside className={cn(
//             "fixed z-40 h-full w-20 hover:w-64 transition-all duration-300 ease-in-out",
//             "bg-background border-r border-border",
//             "flex flex-col items-start py-6 overflow-hidden",
//             "dark:bg-black/20 dark:border-gray-800"
//         )}>
//             <div className="px-4 mb-8 w-full flex items-center">
//                 <img
//                     src="/logo.png"
//                     alt="Logo"
//                     className="w-10 h-10 mx-auto group-hover:ml-0"
//                 />
//             </div>

//             <nav className="w-full space-y-2 px-2">
//                 <SidebarItem
//                     href="/dashboard"
//                     icon={<LayoutDashboard className="h-5 w-5" />}
//                     label="Dashboard"
//                 />
//                 <SidebarItem
//                     href="/create-project"
//                     icon={<PlusCircle className="h-5 w-5" />}
//                     label="Create Project"
//                 />
//             </nav>

//             <div className="flex-grow"></div>

//             <div className="w-full px-2 space-y-2 mt-auto">
//                 <SidebarItem
//                     href="/settings"
//                     icon={<Settings className="h-5 w-5" />}
//                     label="Settings"
//                 />
//                 <div className="w-full flex justify-center px-2 py-4">
//                     <UserButton
//                         appearance={{
//                             elements: {
//                                 userButtonAvatarBox: "w-8 h-8",
//                             }
//                         }}
//                     />
//                 </div>
//             </div>
//         </aside>
//     )
// }

// function SidebarItem({ href, icon, label }: { href: string; icon: JSX.Element; label: string }) {
//     return (
//         <TooltipProvider>
//             <Tooltip delayDuration={100}>
//                 <TooltipTrigger asChild>
//                     <Link
//                         href={href}
//                         className={cn(
//                             "group w-full flex items-center py-2 px-3 rounded-md",
//                             "hover:bg-accent/10 transition-colors duration-200",
//                             "text-muted-foreground hover:text-foreground"
//                         )}
//                     >
//                         <div className="flex items-center space-x-3 w-full">
//                             <span className="flex-shrink-0">{icon}</span>
//                             <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
//                                 {label}
//                             </span>
//                         </div>
//                     </Link>
//                 </TooltipTrigger>
//                 <TooltipContent side="right" className="dark:bg-gray-900 dark:text-gray-200">
//                     {label}
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//     )
// }



import Link from "next/link";
import {
    LayoutDashboard,
    PlusCircle,
    Settings,
    Phone, // Importing a phone icon for the Call Bot button
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    return (
        <aside className={cn(
            "fixed z-40 h-full w-64", // Set a constant width for the sidebar
            "bg-background border-r border-border",
            "flex flex-col items-start py-6 overflow-hidden",
            "dark:bg-black/20 dark:border-gray-800"
        )}>
            <div className="px-4 mb-8 w-full flex items-center">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-10 h-10 mx-auto"
                />
            </div>

            <nav className="w-full space-y-2 px-2">
                <SidebarItem
                    href="/Dashboard"
                    icon={<LayoutDashboard className="h-5 w-5" />}
                    label="Dashboard"
                />
                <SidebarItem
                    href="/create-project"
                    icon={<PlusCircle className="h-5 w-5" />}
                    label="Create Project"
                />
                {/* Add Call Bot button here */}
                <SidebarItem
                    href="/Dashboard/CallBot" // Update with the correct route for your Call Bot functionality
                    icon={<Phone className="h-5 w-5" />}
                    label="Call Bot"
                />
            </nav>

            <div className="flex-grow"></div>

            <div className="w-full px-2 space-y-2 mt-auto">
                <SidebarItem
                    href="/settings"
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                />
                <div className="w-full flex justify-center px-2 py-4">
                    {/* Uncomment and customize the UserButton if needed */}
                    {/* <User Button
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-8 h-8",
                            }
                        }}
                    /> */}
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
                            "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <div className="flex items-center space-x-3 w-full">
                            <span className="flex-shrink-0">{icon}</span>
                            <span className="opacity-100 whitespace-nowrap transition-opacity duration-300"> {/* Always visible */}
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