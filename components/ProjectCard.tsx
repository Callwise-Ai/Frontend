// "use client"

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MoreHorizontal, Trash2, Edit2, ExternalLink } from 'lucide-react';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { toast } from 'sonner';

// type Project = {
//     _id: string;
//     user_id: string;
//     name: string;
//     available_models: string[];
//     context: string;
//     selected_model: string;
//     created_at?: string;
//     updated_at?: string;
// };

// interface ProjectCardProps {
//     project: Project;
//     onProjectDeleted?: () => void;
// }

// export default function ProjectCard({ project, onProjectDeleted }: ProjectCardProps) {
//     const router = useRouter();
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [isDeleting, setIsDeleting] = useState(false);

//     const handleProjectClick = () => {
//         router.push(`/project/${project._id}`);
//     };

//     const handleEdit = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         router.push(`/project/${project._id}/edit`);
//     };

//     const handleDelete = async (e: React.MouseEvent) => {
//         e.stopPropagation();
//         setIsDeleting(true);
//         try {
//             const response = await fetch(`/api/projects/${project._id}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete project');
//             }

//             toast.success('Project deleted successfully');
//             onProjectDeleted?.();
//         } catch (error) {
//             console.error('Error deleting project:', error);
//             toast.error('Failed to delete project');
//         } finally {
//             setIsDeleting(false);
//             setIsDeleteDialogOpen(false);
//         }
//     };

//     const formatDate = (dateString?: string) => {
//         if (!dateString) return 'N/A';
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     return (
//         <>
//             <Card
//                 className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1 cursor-pointer border border-gray-700"
//                 onClick={handleProjectClick}
//             >
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-white text-xl font-semibold truncate">
//                         {project.name || 'Untitled Project'}
//                     </CardTitle>
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild onClick={(e:any) => e.stopPropagation()}>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                                 <MoreHorizontal className="h-4 w-4 text-gray-400" />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
//                             <DropdownMenuItem
//                                 className="text-white hover:bg-gray-700 cursor-pointer"
//                                 onClick={handleEdit}
//                             >
//                                 <Edit2 className="mr-2 h-4 w-4" />
//                                 Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                                 className="text-red-400 hover:bg-gray-700 cursor-pointer"
//                                 onClick={(e:any) => {
//                                     e.stopPropagation();
//                                     setIsDeleteDialogOpen(true);
//                                 }}
//                             >
//                                 <Trash2 className="mr-2 h-4 w-4" />
//                                 Delete
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="space-y-2">
//                         <p className="text-gray-400 text-sm">
//                             Model: {project.selected_model}
//                         </p>
//                         <p className="text-gray-400 text-sm line-clamp-2">
//                             Context: {project.context || 'No context provided'}
//                         </p>
//                     </div>
//                 </CardContent>
//                 <CardFooter className="text-xs text-gray-500">
//                     <div className="w-full flex justify-between items-center">
//                         <span>Created: {formatDate(project.created_at)}</span>
//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             className="text-blue-400 hover:text-blue-300 p-0"
//                             onClick={handleProjectClick}
//                         >
//                             <ExternalLink className="h-4 w-4 mr-1" />
//                             Open
//                         </Button>
//                     </div>
//                 </CardFooter>
//             </Card>

//             <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                 <AlertDialogContent className="bg-gray-800 border-gray-700">
//                     <AlertDialogHeader>
//                         <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
//                         <AlertDialogDescription className="text-gray-400">
//                             Are you sure you want to delete "{project.name}"? This action cannot be undone.
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                         <AlertDialogCancel
//                             className="bg-gray-700 text-white hover:bg-gray-600"
//                             onClick={(e:any) => e.stopPropagation()}
//                         >
//                             Cancel
//                         </AlertDialogCancel>
//                         <AlertDialogAction
//                             className="bg-red-600 text-white hover:bg-red-700"
//                             onClick={handleDelete}
//                             disabled={isDeleting}
//                         >
//                             {isDeleting ? 'Deleting...' : 'Delete'}
//                         </AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </>
//     );
// }



"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit2, ExternalLink } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

type Project = {
    _id: string;
    user_id: string;
    name: string;
    available_models: string[];
    context: string;
    selected_model: string;
    created_at?: string;
    updated_at?: string;
};

interface ProjectCardProps {
    project: Project;
    onProjectDeleted?: () => void;
}

export default function ProjectCard({ project, onProjectDeleted }: ProjectCardProps) {
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleProjectClick = () => {
        router.push(`/project/${project._id}`);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/project/${project._id}/edit`);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/projects/${project._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            toast.success('Project deleted successfully');
            onProjectDeleted?.();
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project');
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
            <Card
                className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1 cursor-pointer border border-gray-700"
                onClick={handleProjectClick}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-white text-xl font-semibold truncate">
                        {project.name || 'Untitled Project'}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem
                                className="text-white hover:bg-gray-700 cursor-pointer"
                                onClick={handleEdit}
                            >
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-400 hover:bg-gray-700 cursor-pointer"
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    setIsDeleteDialogOpen(true);
                                }}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="text-gray-400 text-sm">
                            Model: {project.selected_model}
                        </p>
                        <p className="text-gray-400 text-sm line-clamp-2">
                            Context: {project.context || 'No context provided'}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="text-xs text-gray-500">
                    <div className="w-full flex justify-between items-center">
                        <span>Created: {formatDate(project.created_at)}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 p-0"
                            onClick={handleProjectClick}
                        >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Open
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-gray-800 border-gray-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            Are you sure you want to delete &quot;{project.name}&quot;? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="bg-gray-700 text-white hover:bg-gray-600"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
