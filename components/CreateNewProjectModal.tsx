"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { pdfToText } from 'pdf-ts';
import { useUser } from "@clerk/nextjs";

// Predefined Models
const AVAILABLE_MODELS = [
    "Meta-Llama-3.1-405B-Instruct",
    "Meta-Llama-3.1-70B-Instruct",
    "Meta-Llama-3.1-8B-Instruct",
    "Meta-Llama-3.2-3B-Instruct"
];

// Types
interface ProjectData {
    apiKey: string;
    model: string;
    file: File | null;
    fileContent: string;
}

export function CreateNewProjectModal({ isNewUser = false }) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(isNewUser);
    const [projectData, setProjectData] = useState<ProjectData>({
        apiKey: '',
        model: '',
        file: null,
        fileContent: ''
    });

    // Get user ID from Clerk
    const { user } = useUser();
    const userId = user?.id;

    // Validate and Set API Key
    const handleSetApiKey = async () => {
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://64.227.138.80:5000/set_api_key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    api_key: projectData.apiKey
                })
            });

            const result = await response.json();

            if (response.ok) {
                // If API key is set successfully, move to model selection
                toast.success('API Key validated successfully');
                setStep(2);
            } else {
                toast.error(result.error || 'Failed to set API key');
            }
        } catch (error) {
            console.error('API Key Setting Error:', error);
            toast.error('Error setting API key');
        } finally {
            setIsLoading(false);
        }
    };

    // Set Model
    const handleSetModel = async () => {
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://64.227.138.80:5000/set_model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    model: projectData.model
                })
            });

            const result = await response.json();

            if (response.ok) {
                // Move to file upload step
                setStep(3);
            } else {
                toast.error(result.error || 'Failed to set model');
            }
        } catch (error) {
            console.error('Model Setting Error:', error);
            toast.error('Error setting model');
        } finally {
            setIsLoading(false);
        }
    };

    // File Upload Handler
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Strict PDF file validation
            if (file.type !== 'application/pdf') {
                toast.error('Invalid file type', {
                    description: 'Please upload only PDF files'
                });
                return;
            }

            const maxSize = 50 * 1024 * 1024; // 50MB
            if (file.size > maxSize) {
                toast.error('File too large', {
                    description: 'Maximum file size is 50MB'
                });
                return;
            }

            setIsLoading(true);
            try {
                const fileBuffer = await file.arrayBuffer();
                const parsedText = await pdfToText(new Uint8Array(fileBuffer));

                // Validate extracted content
                if (!parsedText || parsedText.length < 10) {
                    throw new Error('No meaningful content extracted');
                }

                // Send context to backend
                const response = await fetch('http://64.227.138.80:5000/set_context', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        context: parsedText
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    setProjectData(prev => ({
                        ...prev,
                        file,
                        fileContent: parsedText
                    }));

                    toast.success('PDF content extracted and sent successfully', {
                        description: `Extracted ${parsedText.split(' ').length} words`
                    });

                    // Close modal and mark project creation complete
                    setIsModalOpen(false);
                } else {
                    throw new Error(result.error || 'Failed to set context');
                }
            } catch (error) {
                console.error("Error parsing PDF or setting context:", error);
                toast.error('Error processing PDF', {
                    description: error instanceof Error ? error.message : 'Unknown error'
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Function to trigger file input
    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    // Render Step Content
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="apiKey">API Key</Label>
                            <Input
                                id="apiKey"
                                type="password"
                                value={projectData.apiKey}
                                onChange={(e) => setProjectData(prev => ({
                                    ...prev,
                                    apiKey: e.target.value
                                }))}
                                placeholder="Enter your API key"
                            />
                        </div>
                        <Button
                            onClick={handleSetApiKey}
                            className="w-full"
                            disabled={isLoading || !projectData.apiKey.trim()}
                        >
                            {isLoading ? 'Validating...' : 'Next'}
                        </Button>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Select Model</Label>
                            <Select
                                value={projectData.model}
                                onValueChange={(value) => setProjectData(prev => ({
                                    ...prev,
                                    model: value
                                }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {AVAILABLE_MODELS.map((model) => (
                                        <SelectItem key={model} value={model}>
                                            {model}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleSetModel}
                            className="w-full"
                            disabled={isLoading || !projectData.model}
                        >
                            {isLoading ? 'Setting Model...' : 'Next'}
                        </Button>
                    </div>
                );

            // case 3:
            //     return (
            //         <div className="space-y-4">
            //             <div className="space-y-2">
            //                 <Label>Upload PDF</Label>
            //                 <div className="flex items-center space-x-2">
            //                     <Input
            //                         type="file"
            //                         accept=".pdf"
            //                         onChange={handleFileUpload}
            //                         disabled={isLoading}
            //                         className="hidden"
            //                         ref={fileInputRef}
            //                     />
            //                     {projectData.file && (
            //                         <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            //                             <FileIcon className="h-4 w-4" />
            //                             <span>{projectData.file.name}</span>
            //                         </div>
            //                     )}
            //                 </div>
            //             </div>

            //             <Button
            //                 onClick={handleFileButtonClick}
            //                 className="w-full"
            //                 disabled={isLoading || !projectData.file}
            //             >
            //                 {isLoading ? 'Processing...' : 'Upload File'}
            //             </Button>
            //         </div>
            //     );

            case 3:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Upload PDF</Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                    disabled={isLoading}
                                    className="hidden"
                                    ref={fileInputRef}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleFileButtonClick}
                                    disabled={isLoading}
                                    className="w-full"
                                >
                                    {projectData.file
                                        ? `Selected: ${projectData.file.name}`
                                        : "Choose PDF File"}
                                </Button>
                            </div>
                        </div>

                        {projectData.file && (
                            <Button
                                type="button"
                                onClick={handleFileButtonClick} // Change this line
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Upload File'}
                            </Button>
                        )}
                    </div>
                );


            default:
                return null;
        }
    };

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={isNewUser ? undefined : setIsModalOpen}
        >
            {!isNewUser && (
                <DialogTrigger asChild>
                    <Button className='p-4 border border-white'>
                        Create New Project
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                        {isNewUser
                            ? "Welcome! Please complete your project setup."
                            : "Fill in the details to create a new project."}
                    </DialogDescription>
                </DialogHeader>
                {renderStepContent()}
            </DialogContent>
        </Dialog>
    );
}