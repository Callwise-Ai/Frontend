
// "use client";

// import { useState, useEffect } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { Copy, CheckCircle } from 'lucide-react';

// type Project = {
//     _id: string;
//     user_id: string;
//     name?: string;
//     available_models: string[];
//     context: string;
//     selected_model: string;
//     api_key?: string;
// };

// const ProjectCard = ({ project }: { project: Project }) => {
//     // const router = useRouter();
//     const [isCopied, setIsCopied] = useState(false);

//     const handleProjectClick = () => {
//         // router.push(`/project/${project._id}`);
//     };

//     const handleCopyUserId = async () => {
//         try {
//             await navigator.clipboard.writeText(project.user_id);
//             setIsCopied(true);
//             toast.success('User ID copied to clipboard');

//             // Reset the copied state after 2 seconds
//             setTimeout(() => {
//                 setIsCopied(false);
//             }, 2000);
//         } catch (err) {
//             console.error('Failed to copy:', err);
//             toast.error('Failed to copy User ID');
//         }
//     };

//     return (
//         <Card className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer relative group" onClick={handleProjectClick}>
//             <CardHeader>
//                 <CardTitle className="text-white">Model: {project.selected_model}</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-2">
//                     {/* <p className="text-gray-400 text-sm">Model: {project.selected_model}</p> */}
//                     {/* <p className="text-gray-400 text-sm truncate">
//                         Context: {project.context || 'No context provided'}
//                     </p> */}

//                     {/* User ID Display with Copy Option */}
//                     <div className="flex items-center justify-between mt-2 bg-gray-700 rounded-md p-2">
//                         <span className="text-xs text-gray-300 truncate mr-2">
//                             API key: {project.user_id}
//                         </span>
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation(); // Prevent triggering card click
//                                 handleCopyUserId();
//                             }}
//                             className="text-gray-400 hover:text-white transition-colors"
//                         >
//                             {isCopied ? (
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                             ) : (
//                                 <Copy className="h-4 w-4" />
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// export default function DashboardPage() {
//     const { user, isLoaded } = useUser();
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isNewUser, setIsNewUser] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         async function fetchProjects() {
//             // Wait for user to be loaded
//             if (!isLoaded) {
//                 return;
//             }

//             // Redirect if no user
//             if (!user) {
//                 router.push('/');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch(`/api/projects/${user.id}`);

//                 // Specifically handle 404 as a new user scenario
//                 if (response.status === 404) {
//                     setIsNewUser(true);
//                     setProjects([]);
//                     setLoading(false);
//                     return;
//                 }

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log("API Response:", data);

//                 // Handle different response formats
//                 if (Array.isArray(data)) {
//                     setProjects(data);
//                     setIsNewUser(data.length === 0);
//                 } else if (data && typeof data === 'object' && data._id) {
//                     // If it's a single project object, wrap it in an array
//                     setProjects([data]);
//                     setIsNewUser(false);
//                 } else if (data && data.projects && Array.isArray(data.projects)) {
//                     setProjects(data.projects);
//                     setIsNewUser(data.projects.length === 0);
//                 } else {
//                     console.warn("Unexpected data format:", data);
//                     setProjects([]);
//                     setIsNewUser(true);
//                 }

//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching projects:', err);
//                 setError(err instanceof Error ? err.message : 'An unknown error occurred');

//                 // Set to new user if there's an error fetching projects
//                 setIsNewUser(true);
//                 setProjects([]);
//                 setLoading(false);
//             }
//         }

//         fetchProjects();
//     }, [user, isLoaded, router]);

//     // Wait for user to be loaded
//     if (!isLoaded) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <p className="text-white">Loading...</p>
//             </div>
//         );
//     }

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
//         <div className="flex flex-col min-h-screen">
//             <div className="flex-grow p-6 ml-64 bg-gray-900 space-y-6">
//                 {isNewUser ? (
//                     <CreateNewProjectModal isNewUser={true} />
//                 ) : (
//                     <div className="space-y-6">
//                         <div className="flex justify-between items-center">
//                             <h1 className="text-2xl font-bold text-white">My Projects</h1>
//                             {/* Only show the button if there are no projects */}
//                             {projects.length === 0 && <CreateNewProjectModal />}
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {projects.length > 0 ? (
//                                 projects.map((project: Project) => (
//                                     <ProjectCard
//                                         key={project._id}
//                                         project={project}
//                                     />
//                                 ))
//                             ) : (
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

//             {/* Note about project creation limit at the bottom */}
//             <div className="fixed bottom-0 left-0 pl-40  ml-40 right-0 p-4 bg-gray-800 border-t border-gray-700">
//                 <Card className="bg-gray-700  ">
//                     <CardContent>
//                         <p className="text-gray-300 text-center pt-6">
//                             Note: Currently, we only support one project creation per user.
//                         </p>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }





"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Copy, CheckCircle } from 'lucide-react';

type Project = {
    _id: string;
    user_id: string;
    name?: string;
    available_models: string[];
    context: string;
    selected_model: string;
    api_key?: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleProjectClick = () => {
        // router.push(`/project/${project._id}`);
    };

    const handleCopyUserId = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering card click

        try {
            // Fallback method for copying text
            const copyText = () => {
                const textArea = document.createElement('textarea');
                textArea.value = project.user_id;

                // Make the textarea out of viewport
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);

                // Select the text
                textArea.select();
                textArea.setSelectionRange(0, 99999); // For mobile devices

                // Copy the text
                document.execCommand('copy');

                // Remove the textarea
                document.body.removeChild(textArea);
            };

            // Try modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(project.user_id).then(() => {
                    setIsCopied(true);
                    toast.success('User ID copied to clipboard');

                    // Reset the copied state after 2 seconds
                    setTimeout(() => {
                        setIsCopied(false);
                    }, 2000);
                }).catch((err) => {
                    console.error('Clipboard API failed:', err);
                    copyText();
                });
            } else {
                // Fallback for less modern browsers or non-secure contexts
                copyText();
                setIsCopied(true);
                toast.success('User ID copied to clipboard');

                // Reset the copied state after 2 seconds
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('Failed to copy User ID');
        }
    };

    return (
        <Card
            className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer relative group"
            onClick={handleProjectClick}
        >
            <CardHeader>
                <CardTitle className="text-white">Model: {project.selected_model}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {/* User ID Display with Copy Option */}
                    <div className="flex items-center justify-between mt-2 bg-gray-700 rounded-md p-2">
                        <span className="text-xs text-gray-300 truncate mr-2">
                            API key: {project.user_id}
                        </span>
                        <button
                            onClick={handleCopyUserId}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            {isCopied ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchProjects() {
            // Wait for user to be loaded
            if (!isLoaded) {
                return;
            }

            // Redirect if no user
            if (!user) {
                router.push('/');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/projects/${user.id}`);

                // Specifically handle 404 as a new user scenario
                if (response.status === 404) {
                    setIsNewUser(true);
                    setProjects([]);
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

                // Handle different response formats
                if (Array.isArray(data)) {
                    setProjects(data);
                    setIsNewUser(data.length === 0);
                } else if (data && typeof data === 'object' && data._id) {
                    // If it's a single project object, wrap it in an array
                    setProjects([data]);
                    setIsNewUser(false);
                } else if (data && data.projects && Array.isArray(data.projects)) {
                    setProjects(data.projects);
                    setIsNewUser(data.projects.length === 0);
                } else {
                    console.warn("Unexpected data format:", data);
                    setProjects([]);
                    setIsNewUser(true);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');

                // Set to new user if there's an error fetching projects
                setIsNewUser(true);
                setProjects([]);
                setLoading(false);
            }
        }

        fetchProjects();
    }, [user, isLoaded, router]);

    // Wait for user to be loaded
    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

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
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow p-6 ml-64 bg-gray-900 space-y-6">
                {isNewUser ? (
                    <CreateNewProjectModal isNewUser={true} />
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-white">My Projects</h1>
                            {/* Only show the button if there are no projects */}
                            {projects.length === 0 && <CreateNewProjectModal />}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.length > 0 ? (
                                projects.map((project: Project) => (
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                    />
                                ))
                            ) : (
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

            {/* Note about project creation limit at the bottom */}
            <div className="fixed bottom-0 left-0 pl-40 ml-40 right-0 p-4 bg-gray-800 border-t border-gray-700">
                <Card className="bg-gray-700">
                    <CardContent>
                        <p className="text-gray-300 text-center pt-6">
                            Note: Currently, we only support one project creation per user.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}