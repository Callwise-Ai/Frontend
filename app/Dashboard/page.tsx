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
            <div className="flex-grow p-6 ml-64"> {/* Assuming sidebar width is 16rem (64) */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">My Projects</h1>
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
                            <Card className="col-span-full">
                                <CardHeader>
                                    <CardTitle>No Projects Yet</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Create your first project to get started!</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}