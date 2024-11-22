import { Inter } from 'next/font/google'
import Sidebar from './sidebar'
// import { TooltipProvider } from "@/components/ui/tooltip"
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className={`flex h-screen ${inter.className}`}>
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">

                    {children}

            </main>
        </div>
    )
}