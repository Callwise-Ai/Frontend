"use client"
import React, { useState, useRef } from 'react';
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

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useUser();
    const userId = user?.id;

    // Function to validate API key format (UUID)
    const isValidApiKey = (key: string) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(key);
    };

    const handleSetApiKey = async () => {
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        // Validate API key format
        if (!isValidApiKey(projectData.apiKey)) {
            toast.error('Invalid API Key format. Please enter a valid UUID.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('//157.245.98.67:5000/set_api_key', {
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

    const handleSetModel = async () => {
        if (!userId) {
            toast.error('User not authenticated');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('//64.227.138.80:5000/set_model', {
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
                toast.success('Model set successfully');
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

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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

            if (!parsedText || parsedText.length < 10) {
                throw new Error('No meaningful content extracted');
            }

            // Update file state before making the API call
            setProjectData(prev => ({
                ...prev,
                file,
                fileContent: parsedText
            }));

            const contextResponse = await fetch('//64.227.138.80:5000/set_context', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    context: parsedText
                })
            });

            if (!contextResponse.ok) {
                throw new Error('Failed to set context');
            }

            // const projectResponse = await fetch('/api/projects', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ user_id: userId })
            // });

            // const projectResult = await projectResponse.json();

            // if (projectResult.message === 'User created successfully') {
            //     toast.success('Project created successfully');
            //     setIsModalOpen(false);
            // } else {
            //     throw new Error(projectResult.message || 'Failed to create project');
            // }
        } catch (error) {
            console.error("Error processing file:", error);
            toast.error('Error processing PDF', {
                description: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                                placeholder="Enter your Sambanova API key"
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
                                onValueChange={(value) => {
                                    setProjectData(prev => ({
                                        ...prev,
                                        model: value
                                    }));
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a model" />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
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

            case 3:
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Upload PDF</Label>
                            <input
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
                    <Button className="p-4 border border-white">
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