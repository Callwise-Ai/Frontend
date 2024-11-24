// pages/call-bot.tsx

import React from 'react';

const CallBotPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 pl-40"> {/* Dark background */}
            <div className="text-center text-white"> {/* White text for dark mode */}
                <h1 className="text-4xl font-bold">Coming Soon</h1>
                <p className="mt-4 text-lg text-gray-400"> {/* Muted foreground for text */}
                    Our Call Bot feature is on its way! Stay tuned for updates.
                </p>
            </div>
        </div>
    );
};

export default CallBotPage;