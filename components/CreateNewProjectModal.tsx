// "use client"
// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { PlusIcon, FileIcon } from 'lucide-react';
// import { pdfToText } from 'pdf-ts'; // Adjust the import according to your setup

// // Types
// interface ProjectData {
//     apiKey: string;
//     model: string;
//     file: File | null;
//     fileContent: string;
// }

// export function CreateNewProjectModal() {
//     const [step, setStep] = useState(1);
//     const [isLoading, setIsLoading] = useState(false);
//     const [projectData, setProjectData] = useState<ProjectData>({
//         apiKey: '',
//         model: '',
//         file: null,
//         fileContent: ''
//     });

//     console.log('projectData:', projectData);

//     // File Upload Handler
//     const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             // Strict PDF file validation
//             if (file.type !== 'application/pdf') {
//                 toast.error('Invalid file type', {
//                     description: 'Please upload only PDF files'
//                 });
//                 return;
//             }

//             const maxSize = 50 * 1024 * 1024; // 50MB
//             if (file.size > maxSize) {
//                 toast.error('File too large', {
//                     description: 'Maximum file size is 50MB'
//                 });
//                 return;
//             }

//             setIsLoading(true);
//             try {
//                 const fileBuffer = await file.arrayBuffer();
//                 const parsedText = await pdfToText(new Uint8Array(fileBuffer));
//                 console.log('Parsed Text:', parsedText);
//                 // Validate extracted content
//                 if (!parsedText || parsedText.length < 10) {
//                     throw new Error('No meaningful content extracted');
//                 }

//                 setProjectData(prev => ({
//                     ...prev,
//                     file,
//                     fileContent: parsedText
//                 }));

//                 toast.success('PDF content extracted successfully', {
//                     description: `Extracted ${parsedText.split(' ').length} words`
//                 });
//             } catch (error) {
//                 console.error("Error parsing PDF:", error);
//                 toast.error('Error extracting PDF content', {
//                     description: error instanceof Error ? error.message : 'Unknown error'
//                 });
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };

//     // Submit Handler
//     const handleSubmit = async () => {
//         // Validation logic
//         if (!projectData.apiKey) {
//             toast.error('Missing API Key');
//             return;
//         }

//         if (!projectData.model) {
//             toast.error('Select a model');
//             return;
//         }

//         if (!projectData.file) {
//             toast.error('Upload a PDF file');
//             return;
//         }

//         try {
//             // Simulate project creation or send to backend
//             console.log('Project Data:', {
//                 apiKey: projectData.apiKey,
//                 model: projectData.model,
//                 fileSize: projectData.file.size,
//                 contentLength: projectData.fileContent.length
//             });

//             toast.success('Project Created Successfully', {
//                 description: `Created with ${projectData.model} model`
//             });

//             // Optional: Reset form or close dialog
//             setProjectData({
//                 apiKey: projectData.apiKey, // Preserve API key
//                 model: '',
//                 file: null,
//                 fileContent: ''
//             });
//             setStep(1);
//         } catch (error) {
//             toast.error('Project Creation Failed', {
//                 description: error instanceof Error ? error.message : 'Unknown error'
//             });
//         }
//     };

//     // Render Step Content
//     const renderStepContent = () => {
//         switch (step) {
//             case 1:
//                 return (
//                     <div className="space-y-4">
//                         <div>
//                             < Label htmlFor="apiKey">API Key</Label>
//                             <Input
//                                 id="apiKey"
//                                 type="password"
//                                 value={projectData.apiKey}
//                                 onChange={(e) => setProjectData(prev => ({
//                                     ...prev,
//                                     apiKey: e.target.value
//                                 }))}
//                                 placeholder="Enter your API key"
//                             />
//                         </div>
//                         <Button
//                             onClick={() => setStep(2)}
//                             className="w-full"
//                             disabled={!projectData.apiKey.trim()}
//                         >
//                             Next
//                         </Button>
//                     </div>
//                 );

//             case 2:
//                 return (
//                     <div className="space-y-4">
//                         <div>
//                             <Label>Select Model</Label>
//                             <Select
//                                 value={projectData.model}
//                                 onValueChange={(value) => setProjectData(prev => ({
//                                     ...prev,
//                                     model: value
//                                 }))}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Choose a model" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
//                                     <SelectItem value="gpt-4">GPT-4</SelectItem>
//                                     <SelectItem value="claude-2">Claude 2</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div className="space-y-2">
//                             <Label>Upload PDF</Label>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="file"
//                                     accept=".pdf"
//                                     onChange={handleFileUpload}
//                                     disabled={isLoading}
//                                     className="flex-grow"
//                                 />
//                                 {projectData.file && (
//                                     <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                                         <FileIcon className="h-4 w-4" />
//                                         <span>{projectData.file.name}</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <Button
//                             onClick={handleSubmit}
//                             className="w-full"
//                             disabled={isLoading || !projectData.model || !projectData.file}
//                         >
//                             {isLoading ? 'Processing...' : 'Create Project'}
//                         </Button>
//                     </div>
//                 );

//             default:
//                 return null;
//         }
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button>
//                     <PlusIcon className="mr-2 h-4 w-4" />
//                     Create New Project
//                 </Button>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Create New Project</DialogTitle>
//                     <DialogDescription>
//                         Fill in the details to create a new project.
//                     </DialogDescription>
//                 </DialogHeader>
//                 {renderStepContent()}
//             </DialogContent>
//         </Dialog>
//     );
// }


"use client"
import React, { useState, useEffect } from 'react';
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
import { PlusIcon, FileIcon } from 'lucide-react';
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

export function CreateNewProjectModal() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
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
            const response = await fetch('http://127.0.0.1:5001/set_api_key', {
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
            const response = await fetch('http://127.0.0.1:5001/set_model', {
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
                const response = await fetch('http://127.0.0.1:5001/set_context', {
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

                    // Optionally add further logic for project completion
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
                            disable d={isLoading || !projectData.model}
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
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                    disabled={isLoading}
                                    className="flex-grow"
                                />
                                {projectData.file && (
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <FileIcon className="h-4 w-4" />
                                        <span>{projectData.file.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            onClick={handleFileUpload}
                            className="w-full"
                            disabled={isLoading || !projectData.file}
                        >
                            {isLoading ? 'Processing...' : 'Upload File'}
                        </Button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create New Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new project.
                    </DialogDescription>
                </DialogHeader>
                {renderStepContent()}
            </DialogContent>
        </Dialog>
    );
}