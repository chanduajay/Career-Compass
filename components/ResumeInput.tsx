import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './Icons';
import * as pdfjsLib from 'pdfjs-dist';

// Use the ES module version of pdf.js, loaded via importmap in index.html.
// This is more robust than loading a global script and polling for it.
// Set the workerSrc for pdf.js. This is required for it to work in the browser.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ResumeInput: React.FC<ResumeInputProps> = ({ value, onChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
    }

    setIsParsing(true);
    setFileName(file.name);
    
    const fileReader = new FileReader();
    
    fileReader.onload = async (event) => {
        try {
            if (!event.target?.result) throw new Error("File reading failed.");
            
            const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n\n';
            }
            onChange(fullText.trim());
        } catch (error: any) {
            console.error('Error parsing PDF:', error);
            let errorMessage = 'An unexpected error occurred while parsing the PDF. Please try again.';
            
            if (error.name === 'PasswordException') {
                errorMessage = 'This PDF is password-protected. Please upload a version without a password.';
            } else if (error.name === 'InvalidPDFException' || error.message?.includes('Invalid PDF structure')) {
                errorMessage = 'The uploaded file appears to be corrupted or is not a valid PDF. Please try a different file.';
            }
            
            alert(errorMessage);
            setFileName(null);
            onChange('');
        } finally {
            setIsParsing(false);
        }
    };

    fileReader.onerror = () => {
        console.error('Error reading file');
        alert('There was an error reading the file.');
        setIsParsing(false);
        setFileName(null);
    };
    
    fileReader.readAsArrayBuffer(file);
  }, [onChange]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="card-style p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">1. Your Resume</h2>
      
      <div 
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${isDragging ? 'drag-active-glow' : 'border-slate-600 hover:border-cyan-500'}`}
      >
        <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            accept=".pdf"
            className="hidden"
            aria-label="Upload Resume"
        />
        <div className="flex flex-col items-center">
            <UploadIcon />
            <p className="mt-2 text-sm text-slate-400">
                <button type="button" onClick={handleButtonClick} className="font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors">
                    Upload a PDF
                </button> or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">Your resume text will appear below.</p>
            {isParsing && <p className="text-sm text-yellow-400 mt-2 animate-pulse">Parsing PDF...</p>}
            {fileName && !isParsing && <p className="text-sm text-green-400 mt-2">Loaded: {fileName}</p>}
        </div>
      </div>
      
      <p className="text-sm text-slate-400 my-4 text-center">Or paste your full resume text below:</p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Resume text will be extracted here, or you can paste it directly..."
        className="w-full h-80 p-4 border border-slate-700 rounded-md bg-slate-900/70 text-slate-300 font-mono focus:outline-none textarea-glow resize-none text-sm"
        aria-label="Resume Input"
      />
    </div>
  );
};