"use client"
import React, { useState } from 'react';
import { Book, Code, Server, HelpCircle, Github } from 'lucide-react';

const CallWiseDocs = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        {
            id: 'overview',
            title: 'Overview',
            icon: <Book className="w-5 h-5" />,
            content: (
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-4">Call Wise Platform Overview</h2>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <p className="text-gray-300 leading-relaxed mb-4">
                            <strong className="text-cyan-400">Call Wise</strong> is an innovative platform designed to enable intelligent, real-time phone call interactions using <strong className="text-cyan-400">Echo</strong>, a custom call bot powered by Large Language Models (LLMs).
                        </p>

                        <div className="border-l-4 border-cyan-500 pl-4 mb-4">
                            <p className="text-gray-200 italic">
                                Echo allows seamless, context-aware interactions during phone calls, enabling users to receive intelligent responses without needing constant internet connectivity.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-900 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-400 mb-3">Key Features</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Real-Time, Internet-Independent Interactions
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Customizable Call Bots
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Agentic Capabilities via RAG_QUERY Endpoint
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Call Transcription & Contextual Understanding
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-400 mb-3">Use Cases</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Customer Support
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Healthcare Consultations
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Technical Assistance
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Enterprise Communication
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-5 rounded-lg">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-3">Platform Workflow</h3>
                        <ol className="space-y-2 text-gray-300 list-decimal pl-5">
                            <li>Personal Project</li>
                            <li>Echo Callbot Toolkit</li>
                            <li>Intelligent Response Generation</li>
                            <li>Contextual Communication</li>
                        </ol>
                    </div>

                    <div className="text-center bg-gray-900 p-4 rounded-lg">
                        <p className="text-gray-300">
                            Call Wise empowers developers to create intelligent, adaptive call bots that work seamlessly across various communication scenarios.
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'api-setup',
            title: 'API Setup',
            icon: <Server className="w-5 h-5" />,
            content: (
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-cyan-400 mb-4">Call Wise API Setup Guide</h2>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Step 1: Environment Preparation</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Python Installation</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center">
                                        <span className="mr-2 text-cyan-500">●</span>
                                        Download Python from official website
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-cyan-500">●</span>
                                        Add Python to system PATH
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-cyan-500">●</span>
                                        Verify installation with `python --version`
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Virtual Environment Setup</h4>
                                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                    <code>
                                        {`# Create virtual environment
python -m venv venv

# Activate environment
# Windows
venv\\Scripts\\activate

# Mac/Linux
source venv/bin/activate`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Step 2: Dependency Installation</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Required Packages</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center">
                                        <span className="mr-2 text-cyan-500">●</span>
                                        requests
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-cyan-500">●</span>
                                        python-dotenv (optional)
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Installation Command</h4>
                                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                    <code>
                                        {`# Install required packages
pip install requests python-dotenv`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Step 3: Environment Variables</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Setting API Key</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center">
                                        <span className="mr-2 text-cyan-500">●</span>
                                        Windows: `set CALLWISE_API=your_key`
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-cyan-500">●</span>
                                        Mac/Linux: `export CALLWISE_API=your_key`
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">.env File Method</h4>
                                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                    <code>
                                        {`# .env file content
CALLWISE_API=your_api_key_here

# Python loading
from dotenv import load_dotenv
load_dotenv()`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Step 4: Verification</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Running the Script</h4>
                                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                    <code>
                                        {`# Run your Python script
python rag_query_script.py`}
                                    </code>
                                </pre>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Expected Output</h4>
                                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                    <code>
                                        {`RAG Response: [Successful Query Result]
Status: Connected Successfully`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Sample test.py Script</h3>
                        <pre className="bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto text-gray-200">
                            <code>
                                {`import os
import requests

# Make sure to set your CALLWISE_API environment variable in your environment

RAG_QUERY_URL = 'http://206.189.138.143:5000/rag_query'

def send_transcript_to_rag_query(final_transcript):
    try:
        callwise_api = os.getenv('CALLWISE_API')
       
        if callwise_api is None:
            print("Error: CALLWISE_API environment variable is not set.")
            return None

        payload = {
            "user_id": callwise_api,
            "query": final_transcript,
            "conversation_history": []
        }

        response = requests.post(RAG_QUERY_URL, json=payload)

        if response.status_code == 200:
            output = response.json().get("response", "No response")
            print("RAG Response:", output)
            return output
        else:
            print("Error:", response.json())
            return None
    except Exception as e:
        print(f"Error sending to RAG query: {e}")
        return None

if __name__ == "__main__":
    final_transcript = "What is the weather like today?"
    rag_output = send_transcript_to_rag_query(final_transcript print("Output from RAG Query:", rag_output)`}
                            </code>
                        </pre>

                        <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-xl font-semibold text-cyan-400 mb-2">Script Explanation</h4>
                            <ul className="text-gray-300 space-y-2">
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Sends transcript to RAG Query endpoint
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Uses environment variable for authentication
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Handles errors and prints responses
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2 text-cyan-500">●</span>
                                    Demonstrates basic API interaction
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'endpoint',
            title: 'Echo Call Bot Toolkit',
            icon: <Code className="w-5 h-5" />,
            content: (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 rounded-lg">
                        <h2 className="text-3xl font-bold text-white mb-4">Echo Call Bot Toolkit</h2>
                        <p className="text-gray-100 mb-4">
                            A comprehensive real-time phone call transcription and AI-powered response system integrating Twilio, Deepgram, and CallWise API.
                        </p>
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com/Architgarg2003/Echo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-cyan-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition flex items-center"
                            >
                                <Github className="mr-2 w-5 h-5" /> View on GitHub
                            </a>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2 text-cyan-400">Endpoint Details</h3>
                            <p className="text-gray-400 mb-2">
                                <strong className="text-gray-200">URL:</strong>
                                <code className="text-cyan-300 block mt-1">http://206.189.138.143:5000/rag_query</code>
                            </p>
                            <p className="text-gray-400">
                                <strong className="text-gray-200">Method:</strong> POST
                            </p>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2 text-cyan-400">Request Payload</h3>
                            <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                <code>
                                    {JSON.stringify({
                                        user_id: "your_callwise_api_key",
                                        query: "What is the weather like today?",
                                        conversation_history: []
                                    }, null, 2)}
                                </code>
                            </pre>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Key Features</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                {
                                    title: "Real-time Transcription",
                                    description: "Utilize Deepgram's live transcription API for accurate, real-time audio conversion."
                                },
                                {
                                    title: "Twilio Integration",
                                    description: "Seamlessly handle incoming calls and stream audio for transcription."
                                },
                                {
                                    title: "AI-Powered Responses",
                                    description: "Leverage CallWise API to generate context-aware responses during calls."
                                }
                            ].map((feature, index) => (
                                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">{feature.title}</h4>
                                    <p className="text-gray-300">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Quick Start</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Installation</h4>
                                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                    <code>
                                        {`# Clone the repository
git clone https://github.com/Architgarg2003/Echo

# Install dependencies
pip install -r requirements.txt`}
                                    </code>
                                </pre>
                            </div>
                            <div>
                                <h4 className="text-xl font-medium text-gray-200 mb-3">Environment Setup</h4>
                                <pre className="bg-gray-700 p-3 rounded text-sm overflow-x-auto text-gray-200">
                                    <code>
                                        {`# Create .env file
TWILIO_ACCOUNT_SID=your_sid
TWILIO_API_KEY_SID=your_key_sid
DEEPGRAM_API_KEY=your_deepgram_key
CALLWISE_API=your_callwise_api`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'support',
            title: 'Support',
            icon: <HelpCircle className="w-5 h-5" />,
            content: (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-cyan-400">Get Help</h2>
                    <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-cyan-500">
                        <h3 className="font-semibold text-lg mb-2 text-gray-200">Contact Information</h3>
                        <p className="text-gray-400">
                            <strong className="text-gray-200">Email:</strong>
                            <a href="mailto:pyextension@gmail.com" className="text-cyan-400 hover:underline ml-2">
                                pyextension@gmail.com
                            </a>
                        </p>
                        <p className="mt-2 text-gray-400">
                            For additional assistance, technical support, or integration questions, please reach out to the Call Wise Support Team.
                        </p>
                    </div>
                    {/* <div className="bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-gray-200">Resources</h3>
                        <a
                            href="https://github.com/callwise/echo-call-bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-cyan-400 hover:text-cyan-300"
                        >
                            <Code className="mr-2 w-5 h-5" /> Echo Call Bot GitHub Repository
                        </a>
                    </div> */}
                </div>
            )
        }
    ];

    return (
        <div className="fixed inset-0 bg-gray-950 text-gray-100 overflow-hidden">
            <div className="flex h-full w-full">
                {/* Sidebar Navigation */}
                <div className="w-64 bg-gray-900 p-4 border-r border-gray-800 overflow-y-auto">
                    <h1 className="text-2xl font-bold text-cyan-400 mb-6">Call Wise Docs</h1>
                    <nav className="space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors ${activeSection === section.id
                                        ? 'bg-gray-800 text-cyan-400'
                                        : 'hover:bg-gray-800 text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                {section.icon}
                                <span className="font-medium">{section.title}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-gray-900">
                    {sections.find(section => section.id === activeSection)?.content}
                </div>
            </div>
        </div>
    );
};

export default CallWiseDocs;