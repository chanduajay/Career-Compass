import React, { useState } from 'react';
import { Header } from './components/Header';
import { ResumeInput } from './components/ResumeInput';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { AnalysisResultDisplay } from './components/AnalysisResultDisplay';
import { Loader } from './components/Loader';
import { getCareerAnalysis } from './services/geminiService';
import type { AnalysisResult } from './types';
import { SparklesIcon } from './components/Icons';
import { Footer } from './components/Footer';

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!resumeText) {
      setError('Please provide your resume text or upload a PDF to get started.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await getCareerAnalysis(resumeText, jdText);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError('An error occurred while analyzing. The AI may have returned an unexpected response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setResumeText('');
    setJdText('');
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {!analysisResult && !isLoading ? (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <ResumeInput value={resumeText} onChange={setResumeText} />
              <JobDescriptionInput value={jdText} onChange={setJdText} />
            </div>
            {error && <p className="text-center text-red-400 mt-6 animate-fade-in">{error}</p>}
            <div className="text-center mt-12">
              <button
                onClick={handleAnalysis}
                disabled={isLoading || !resumeText}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-10 rounded-full hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center mx-auto"
              >
                <SparklesIcon />
                Generate Career Insights
              </button>
            </div>
          </div>
        ) : isLoading ? (
          <Loader />
        ) : analysisResult ? (
          <AnalysisResultDisplay result={analysisResult} onReset={handleReset} />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}