// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import ProjectCard from "./projectCard";
// // // import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";

// // // // Define Project type
// // // interface Project {
// // //     id: string;
// // //     name: string;
// // //     model: string;
// // //     status: 'Active' | 'Processing' | 'Completed';
// // // }

// // // export default function DashboardPage() {
// // //     // Mock projects data - replace with actual data fetching
// // //     const projects: Project[] = [
// // //         {
// // //             id: '1',
// // //             name: 'AI Image Generator',
// // //             model: 'DALL-E',
// // //             status: 'Active'
// // //         },
// // //         {
// // //             id: '2',
// // //             name: 'Text Summarizer',
// // //             model: 'GPT-3',
// // //             status: 'Processing'
// // //         }
// // //     ];

// // //     return (
// // //         <div className="flex">
// // //             {/* Sidebar is fixed, so we need to add margin to the main content */}
// // //             <div className="flex-grow p-6 ml-64 bg-gray-900"> {/* Dark background for main content */}
// // //                 <div className="space-y-6">
// // //                     <div className="flex justify-between items-center">
// // //                         <h1 className="text-2xl font-bold text-white">My Projects</h1> {/* White text for dark mode */}
// // //                         {/* Create New Project Button/Modal */}
// // //                         <CreateNewProjectModal />
// // //                     </div>

// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                         {projects.map(project => (
// // //                             <ProjectCard
// // //                                 key={project.id}
// // //                                 project={project}
// // //                             />
// // //                         ))}

// // //                         {projects.length === 0 && (
// // //                             <Card className="col-span-full bg-gray-800"> {/* Dark background for empty state */}
// // //                                 <CardHeader>
// // //                                     <CardTitle className="text-white">No Projects Yet</CardTitle> {/* White text */}
// // //                                 </CardHeader>
// // //                                 <CardContent>
// // //                                     <p className="text-gray-400">Create your first project to get started!</p> {/* Lighter text for contrast */}
// // //                                 </CardContent>
// // //                             </Card>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }







// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import ProjectCard from "./projectCard";
// // // import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";

// // // // Define Project type
// // // interface Project {
// // //     id: string;
// // //     name: string;
// // //     model: string;
// // //     status: 'Active' | 'Processing' | 'Completed';
// // // }

// // // export default function DashboardPage() {
// // //     // Mock projects data - replace with actual data fetching
// // //     const projects: Project[] = [
// // //         {
// // //             id: '1',
// // //             name: 'AI Image Generator',
// // //             model: 'DALL-E',
// // //             status: 'Active'
// // //         },
// // //         {
// // //             id: '2',
// // //             name: 'Text Summarizer',
// // //             model: 'GPT-3',
// // //             status: 'Processing'
// // //         }
// // //     ];

// // //     return (
// // //         <div className="flex">
// // //             {/* Sidebar is fixed, so we need to add margin to the main content */}
// // //             <div className="flex-grow p-6 ml-64 bg-gray-900"> {/* Dark background for main content */}
// // //                 <div className="space-y-6">
// // //                     <div className="flex justify-between items-center">
// // //                         <h1 className="text-2xl font-bold text-white">My Projects</h1> {/* White text for dark mode */}
// // //                         {/* Create New Project Button/Modal */}
// // //                         <CreateNewProjectModal />
// // //                     </div>

// // //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                         {projects.map(project => (
// // //                             <ProjectCard
// // //                                 key={project.id}
// // //                                 project={project}
// // //                             />
// // //                         ))}

// // //                         {projects.length === 0 && (
// // //                             <Card className="col-span-full bg-gray-800"> {/* Dark background for empty state */}
// // //                                 <CardHeader>
// // //                                     <CardTitle className="text-white">No Projects Yet</CardTitle> {/* White text */}
// // //                                 </CardHeader>
// // //                                 <CardContent>
// // //                                     <p className="text-gray-400">Create your first project to get started!</p> {/* Lighter text for contrast */}
// // //                                 </CardContent>
// // //                             </Card>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }



// // "use client"
// // import { useState, useEffect } from 'react';
// // import { useUser } from '@clerk/nextjs';
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import ProjectCard from "./projectCard";
// // import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";

// // export default function DashboardPage() {
// //     const { user } = useUser();
// //     const [projects, setProjects] = useState<any[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     useEffect(() => {
// //         async function fetchProjects() {
// //             // Only fetch if user is authenticated
// //             if (!user) {
// //                 setLoading(false);
// //                 return;
// //             }

// //             try {
// //                 const response = await fetch(`/api/projects/${user.id}`);

// //                 if (!response.ok) {
// //                     throw new Error('Failed to fetch projects');
// //                 }

// //                 const data = await response.json();
// //                 console.log(data);
// //                 setProjects(data);
// //                 setLoading(false);
// //             } catch (err) {
// //                 setError(err instanceof Error ? err.message : 'An unknown error occurred');
// //                 setLoading(false);
// //             }
// //         }

// //         fetchProjects();
// //     }, [user]);

// //     if (loading) {
// //         return (
// //             <div className="flex justify-center items-center h-screen">
// //                 <p className="text-white">Loading projects...</p>
// //             </div>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <div className="flex justify-center items-center h-screen">
// //                 <p className="text-red-500">{error}</p>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="flex">
// //             <div className="flex-grow p-6 ml-64 bg-gray-900">
// //                 <div className="space-y-6">
// //                     <div className="flex justify-between items-center">
// //                         <h1 className="text-2xl font-bold text-white">My Projects</h1>
// //                         <CreateNewProjectModal />
// //                     </div>

// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                         {projects?.map(project => (
// //                             <ProjectCard
// //                                 key={project?._id}
// //                                 project={project}
// //                             />
// //                         ))}

// //                         {projects?.length === 0 && (
// //                             <Card className="col-span-full bg-gray-800">
// //                                 <CardHeader>
// //                                     <CardTitle className="text-white">No Projects Yet</CardTitle>
// //                                 </CardHeader>
// //                                 <CardContent>
// //                                     <p className="text-gray-400">Create your first project to get started!</p>
// //                                 </CardContent>
// //                             </Card>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }









// "use client"
// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import ProjectCard from "./projectCard";
// import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";

// export default function DashboardPage() {
//     const { user } = useUser();
//     const [projects, setProjects] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isNewUser, setIsNewUser] = useState(false);

//     useEffect(() => {
//         async function fetchProjects() {
//             // Only fetch if user is authenticated
//             if (!user) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch(`/api/projects/${user.id}`);
//                 const data = await response.json();

//                 // Check if the response indicates a new user
//                 if (data.message === 'New user') {
//                     setIsNewUser(true);
//                 } else {
//                     setProjects(data);
//                 }
//                 setLoading(false);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'An unknown error occurred');
//                 setLoading(false);
//             }
//         }

//         fetchProjects();
//     }, [user]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <p className="text-white">Loading projects...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <p className="text-red-500">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="flex">
//             <div className="flex-grow p-6 ml-64 bg-gray-900">
//                 {isNewUser ? (
//                     <CreateNewProjectModal isNewUser={true} />
//                 ) : (
//                     <div className="space-y-6">
//                         <div className="flex justify-between items-center">
//                             <h1 className="text-2xl font-bold text-white">My Projects</h1>
//                             <CreateNewProjectModal />
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {projects?.map(project => (
//                                 <ProjectCard
//                                     key={project?._id}
//                                     project={project}
//                                 />
//                             ))}

//                             {projects?.length === 0 && (
//                                 <Card className="col-span-full bg-gray-800">
//                                     <CardHeader>
//                                         <CardTitle className="text-white">No Projects Yet</CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <p className="text-gray-400">Create your first project to get started!</p>
//                                     </CardContent>
//                                 </Card>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }





"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import ProjectCard from "./projectCard";
import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
type Project = {
    _id: string;
    // Add other properties that exist in your project object
    name?: string;
    // Add other fields as needed based on your actual project structure
};


export default function DashboardPage() {
    const { user } = useUser();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isNewUser, setIsNewUser] = useState(false);

    const router = useRouter()

    useEffect(() => {
        async function fetchProjects() {
            // Only fetch if user is authenticated
            if (!user) {
                router.push('/')
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/projects/${user.id}`);
                const data = await response.json();

                // Check if the response indicates a new user
                if (data.message === 'New user') {
                    setIsNewUser(true);
                } else {
                    setProjects(data);
                }
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        }

        fetchProjects();
    }, [user]);

    const handleCopyApiKey = () => {
        if (user?.id) {
            navigator.clipboard.writeText(user.id)
                .then(() => {
                    toast.success('API Key copied to clipboard', {
                        description: 'Your Clerk User ID can be used as your API key'
                    });
                })
                .catch(error => {
                    toast.error('Failed to copy API key', {
                        description: 'Please try again'
                    });
                    console.error(error)
                });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-white">Loading projects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex">
            <div className="flex-grow p-6 ml-64 bg-gray-900 space-y-6">
                {/* API Key Card */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">
                            Your API Key
                        </CardTitle>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleCopyApiKey}
                            className="text-gray-400 hover:text-white"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white overflow-hidden text-ellipsis">
                            {user?.id || 'N/A'}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            Use this User ID as your API key for authentication
                        </p>
                    </CardContent>
                </Card>

                {isNewUser ? (
                    <CreateNewProjectModal isNewUser={true} />
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-white">My Projects</h1>
                            <CreateNewProjectModal />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects?.map(project => (
                                // <ProjectCard
                                //     key={project?._id}
                                //     project={project}
                                // />
                                <div key={project._id}>

                                </div>
                            ))}

                            {projects?.length === 0 && (
                                <Card className="col-span-full bg-gray-800">
                                    <CardHeader>
                                        <CardTitle className="text-white">No Projects Yet</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400">Create your first project to get started!</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}