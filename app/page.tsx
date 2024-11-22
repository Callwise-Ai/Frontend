"use client"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { Github, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  ClerkProvider,
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
  const sampleCode = `function explodingBeams() {
  return {
    cool: true,
    explosive: true,
    awesome: 'maximum'
  };
}`;

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
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Github className="w-5 h-5" />
                GitHub
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
                  Creativity <br />Meets <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                    Innovation
                  </span>
                </h1>
                <p className="text-xl text-gray-300 italic">
                  "The future belongs to those who believe in the beauty of their dreams."
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
            <div className="w-1/2 relative">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                <div className="bg-gray-700 p-2 flex justify-between items-center">
                  <span className="text-white text-sm">Exploding Beams</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-600"
                    onClick={handleCopy}
                  >
                    {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{sampleCode}</code>
                </pre>
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