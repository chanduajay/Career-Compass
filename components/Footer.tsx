import React from 'react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
    const creatorName = "Chandu Veera Venkata Ajay Kommanti";
    const education = "B.Tech in Computer Science & Engineering - AI & DS";
    const linkedinUrl = "https://www.linkedin.com/in/chandukommanti/";
    const githubUrl = "https://github.com/chanduajay";
    const feedbackEmail = "kommantichandu@gmail.com";
    const mailtoLink = `mailto:${feedbackEmail}?subject=Feedback on Career Compass`;

    return (
        <footer className="w-full mt-16 pb-8 text-center text-slate-500 text-sm">
            <div className="container mx-auto px-4">
                <div className="mx-auto w-full max-w-2xl border-t border-slate-700/50 pt-8">
                    <p className="font-semibold text-slate-400">{creatorName}</p>
                    <p>{education}</p>
                    <div className="flex justify-center space-x-6 my-4">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="hover:text-cyan-400 transition-colors">
                            <LinkedinIcon />
                        </a>
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-cyan-400 transition-colors">
                            <GithubIcon />
                        </a>
                    </div>
                    <a href={mailtoLink} className="inline-block bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 font-medium py-2 px-4 rounded-lg border border-slate-700/50 transition-colors">
                        Provide Feedback
                    </a>
                </div>
            </div>
        </footer>
    );
};