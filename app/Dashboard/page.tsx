import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCard from "./projectCard";
import { CreateNewProjectModal } from "@/components/CreateNewProjectModal";

// Define Project type
interface Project {
    id: string;
    name: string;
    model: string;
    status: 'Active' | 'Processing' | 'Completed';
}

export default function DashboardPage() {
    // Mock projects data - replace with actual data fetching
    const projects: Project[] = [
        {
            id: '1',
            name: 'AI Image Generator',
            model: 'DALL-E',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Text Summarizer',
            model: 'GPT-3',
            status: 'Processing'
        }
    ];

    return (
        <div className="flex">
            {/* Sidebar is fixed, so we need to add margin to the main content */}
            <div className="flex-grow p-6 ml-64 bg-gray-900"> {/* Dark background for main content */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">My Projects</h1> {/* White text for dark mode */}
                        {/* Create New Project Button/Modal */}
                        <CreateNewProjectModal />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}

                        {projects.length === 0 && (
                            <Card className="col-span-full bg-gray-800"> {/* Dark background for empty state */}
                                <CardHeader>
                                    <CardTitle className="text-white">No Projects Yet</CardTitle> {/* White text */}
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">Create your first project to get started!</p> {/* Lighter text for contrast */}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}