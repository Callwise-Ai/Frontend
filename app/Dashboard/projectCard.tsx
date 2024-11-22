import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

// Define Project type
interface Project {
    id: string;
    name: string;
    model: string;
    status: 'Active' | 'Processing' | 'Completed';
}

// Define props type
interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="bg-gray-800"> {/* Dark background for project card */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-white">{project.name}</CardTitle> {/* White text for project name */}
                <Badge
                    variant={project.status === 'Active' ? 'default' : 'secondary'}
                >
                    {project.status}
                </Badge>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-gray-400"> {/* Lighter text for description */}
                    Model: {project.model}
                </CardDescription>
                <div className="mt-4 flex justify-end">
                    <Link href={`/project/${project.id}`}>
                        <Button variant="outline" size="sm" className="text-black border-gray-600"> {/* White text and border for button */}
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}