"use client"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { BookMarked, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [copied, setCopied] = useState(false);
  const sampleCode = `import os
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
    rag_output = send_transcript_to_rag_query(final_transcript)
    print("Output from RAG Query:", rag_output)`;

  // Redirect to dashboard if signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/Dashboard');
    }
  }, [isSignedIn, router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BackgroundBeamsWithCollision className="absolute inset-0 z-10">
      <div className="relative w-screen min-h-screen overflow-hidden">
        <div className="relative z-20 min-h-screen">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex justify-between p-6">
            {/* Logo Placeholder */}
            <div className="text-white text-5xl font-bold font-mono">
              CALLWISE
            </div>

            {/* Authentication Section */}
            <div className="flex items-center space-x-4">
              {/* GitHub Button */}
              <Button
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 flex items-center gap-2"
                onClick={() => window.open('http://localhost:3000/documentation', '_blank')}
              >
                <BookMarked className="w-5 h-5" />
                Documentation
              </Button>

              {/* Clerk Authentication */}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 pt-24 flex items-center justify-between min-h-screen">
            {/* Left Side - Quote */}
            <div className="w-1/2 space-y-8">
              <div className="animate-fade-in-left">
                <h1 className="text-5xl font-bold text-white mb-4">
                Build Smarter  <br />with Custom <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                  AI APIs
                  </span>
                </h1>
                <p className="text-xl text-gray-300 italic">
                Create context-aware LLMs powered by your data. Generate your API in minutes and integrate seamlessly into any application
                </p>
              </div>

              {/* Sign In Button */}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Right Side - Code Box */}
            {/* Right Side - Code Box */}
            <div className="w-1/2 relative">
  <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 w-[600px] h-[600px] overflow-hidden">
    <div className="bg-gray-800 p-2 flex justify-between items-center">
      <span className="text-white text-sm">test.py</span>
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-gray-600"
        onClick={handleCopy}
      >
        {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
      </Button>
    </div>
    <div className="h-[550px] overflow-y-auto">
      <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '16px',
          borderRadius: 0,
          background: 'transparent',
          height: 'auto',
          overflowY: 'visible'
        }}
        codeTagProps={{
          style: {
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.85rem'
          }
        }}
      >
        {sampleCode}
      </SyntaxHighlighter>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

// export default function Home() {
//   return (
//     <ClerkProvider>
//       <HomeContent />
//     </ClerkProvider>
//   );
// }