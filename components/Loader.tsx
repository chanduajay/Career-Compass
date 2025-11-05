import React, { useState, useEffect } from 'react';

const messages = [
    "Analyzing your skills and experience...",
    "Comparing against thousands of career paths...",
    "Identifying key strengths and opportunities...",
    "Generating personalized project ideas...",
    "Crafting actionable recommendations...",
    "Finalizing your career report..."
];

export const Loader: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
             <svg className="w-20 h-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#22d3ee' }} />
                    <stop offset="100%" style={{stopColor: '#3b82f6' }} />
                  </linearGradient>
                </defs>
                <path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="url(#gradient)" strokeWidth="10" fill="none" strokeDasharray="282.74" strokeDashoffset="212.05">
                     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M 50,50 m -30,0 a 30,30 0 1 0 60,0 a 30,30 0 1 0 -60,0" stroke="url(#gradient)" strokeWidth="6" fill="none" strokeDasharray="188.5" strokeDashoffset="141.37" strokeOpacity="0.5">
                     <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="3s" repeatCount="indefinite" />
                </path>
            </svg>
            <h2 className="text-xl font-semibold mt-6 text-white">Generating Insights...</h2>
            <p className="text-slate-400 mt-2 transition-opacity duration-500">{messages[messageIndex]}</p>
        </div>
    );
};