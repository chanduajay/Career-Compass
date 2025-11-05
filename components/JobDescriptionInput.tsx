import React from 'react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ value, onChange }) => {
  return (
    <div className="card-style p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">
        2. Job Description <span className="text-base font-normal text-slate-400">(Optional)</span>
      </h2>
      <p className="text-sm text-slate-400 mb-4">
        For a detailed match analysis, paste the job description you're interested in.
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full h-96 p-4 border border-slate-700 rounded-md bg-slate-900/70 text-slate-300 font-mono focus:outline-none textarea-glow resize-none text-sm"
        aria-label="Job Description Input"
      />
    </div>
  );
};