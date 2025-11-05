import React from 'react';
import type { AnalysisResult, ResumeAnalysisResult, JobMatchResult } from '../types';
import { isJobMatchResult, isResumeAnalysisResult } from '../types';
import { CheckCircleIcon, LightBulbIcon, DocumentTextIcon, LinkIcon, ReturnIcon } from './Icons';

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string, style?: React.CSSProperties }> = ({ title, icon, children, className = '', style }) => (
    <div className={`card-style p-6 ${className}`} style={style}>
        <div className="flex items-center mb-4">
            <div className="text-cyan-400">{icon}</div>
            <h3 className="text-xl font-semibold text-white ml-3">{title}</h3>
        </div>
        <div className="space-y-4 text-slate-300">{children}</div>
    </div>
);

const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
  const getGradient = () => {
    if (value >= 75) return 'from-green-500 to-green-400';
    if (value >= 50) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  return (
    <div className="w-full bg-slate-700 rounded-full h-3">
      <div
        className={`h-3 rounded-full bg-gradient-to-r ${getGradient()} transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const JobMatchProgressBar: React.FC<{ value: number; verdict: string }> = ({ value, verdict }) => {
    const getColor = (type: 'bg' | 'text') => {
        const colorMapping = {
            bg: { high: 'from-green-500 to-green-400', mid: 'from-yellow-500 to-yellow-400', low: 'from-red-500 to-red-400' },
            text: { high: 'text-green-400', mid: 'text-yellow-400', low: 'text-red-400' },
        };
        if (value >= 75) return colorMapping[type].high;
        if (value >= 50) return colorMapping[type].mid;
        return colorMapping[type].low;
    };

    return (
        <div className="w-full px-2" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
            <div className="flex justify-between items-center mb-2">
                <span className={`text-2xl font-bold ${getColor('text')}`}>{verdict}</span>
                <span className="text-2xl font-bold text-white">{value}% Match</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4">
                <div
                    className={`h-4 rounded-full bg-gradient-to-r ${getColor('bg')} transition-all duration-1000 ease-out`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
};


const ResumeAnalysisView: React.FC<{ result: ResumeAnalysisResult }> = ({ result }) => (
    <>
        <ResultCard title="Career Path Recommendations" icon={<LightBulbIcon />} className="mb-6" style={{'--stagger-index': 1} as React.CSSProperties}>
            {result.careerRecommendations.map((rec, index) => (
                <div key={index} className="border-b border-slate-700 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-lg text-cyan-400">{rec.role}</h4>
                        <span className="text-lg font-semibold text-slate-200">{rec.matchPercentage}% Match</span>
                    </div>
                    <ProgressBar value={rec.matchPercentage} />
                    <p className="text-sm text-slate-400 mt-2">{rec.reasoning}</p>
                </div>
            ))}
        </ResultCard>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ResultCard title="Extra Skills to Learn" icon={<CheckCircleIcon />} style={{'--stagger-index': 2} as React.CSSProperties}>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                    {result.skillImprovements.map((skill, index) => (
                        <li key={index}>
                            <span className="font-semibold text-white">{skill.skill}:</span> {skill.reason}
                        </li>
                    ))}
                </ul>
            </ResultCard>

            <ResultCard title="Project Ideas" icon={<DocumentTextIcon />} style={{'--stagger-index': 3} as React.CSSProperties}>
                 <ul className="list-disc list-inside text-slate-300 space-y-3">
                    {result.projectIdeas.map((project, index) => (
                       <li key={index}>
                           <h5 className="font-semibold text-white">{project.title}</h5>
                           <p className="text-sm text-slate-400 pl-2">{project.description}</p>
                       </li>
                    ))}
                </ul>
            </ResultCard>
        </div>

        <ResultCard title="Learning Resources" icon={<LinkIcon />} style={{'--stagger-index': 4} as React.CSSProperties}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.learningResources.map((res, index) => (
                <a href={res.url} target="_blank" rel="noopener noreferrer" key={index} className="block p-4 bg-slate-800/60 hover:bg-slate-700/80 rounded-lg transition-colors duration-200 border border-slate-700 hover:border-cyan-500 transform hover:-translate-y-1">
                    <p className="font-semibold text-cyan-400">{res.title}</p>
                    <p className="text-sm text-slate-400">{res.platform}</p>
                </a>
            ))}
            </div>
        </ResultCard>
    </>
);

const JobMatchView: React.FC<{ result: JobMatchResult }> = ({ result }) => (
    <>
        <ResultCard title="Job Match Analysis" icon={<LightBulbIcon />} className="mb-6" style={{'--stagger-index': 1} as React.CSSProperties}>
            <div className="mb-4">
                <JobMatchProgressBar value={result.matchScore} verdict={result.verdict} />
            </div>
            <div className="mt-6">
                <h4 className="font-semibold text-lg text-white">Summary:</h4>
                <p className="text-slate-300">{result.summary}</p>
            </div>
        </ResultCard>

        <div className="grid md:grid-cols-2 gap-6">
            <ResultCard title="Resume Suggestions" icon={<DocumentTextIcon />} style={{'--stagger-index': 2} as React.CSSProperties}>
                <ul className="list-disc list-inside space-y-2">
                    {result.resumeSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            </ResultCard>
            <ResultCard title="Skills to Add" icon={<CheckCircleIcon />} style={{'--stagger-index': 3} as React.CSSProperties}>
                 <ul className="list-disc list-inside space-y-2">
                    {result.missingSkills.map((skill, index) => (
                        <li key={index} className="font-medium">{skill}</li>
                    ))}
                </ul>
            </ResultCard>
        </div>
    </>
);

export const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="animate-fade-in">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white text-glow">Your AI-Powered Analysis is Ready!</h2>
            <button
                onClick={onReset}
                className="mt-4 bg-slate-700 text-slate-200 font-semibold py-2 px-6 rounded-full hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
                <ReturnIcon />
                Start New Analysis
            </button>
        </div>
      
      <div className="animate-stagger-in">
        {isResumeAnalysisResult(result) && <ResumeAnalysisView result={result} />}
        {isJobMatchResult(result) && <JobMatchView result={result} />}
      </div>
    </div>
  );
};