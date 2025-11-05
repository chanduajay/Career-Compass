import React from 'react';
import { AppLogoIcon } from './Icons';

export const Header: React.FC = () => {
    return (
        <header className="py-6">
            <div className="container mx-auto px-4 flex items-center justify-center text-center">
                <AppLogoIcon />
                <div className="ml-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow">
                        Career Compass
                    </h1>
                    <p className="text-sm md:text-md text-slate-400 mt-1">
                        Your Smart Resume and Job Match Advisor
                    </p>
                </div>
            </div>
        </header>
    );
};