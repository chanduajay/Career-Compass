import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resumeAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    careerRecommendations: {
      type: Type.ARRAY,
      description: "Top 3 suitable job roles based on the resume.",
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING, description: "The recommended job role." },
          matchPercentage: { type: Type.INTEGER, description: "A percentage score (0-100) of how well the resume matches this role." },
          reasoning: { type: Type.STRING, description: "A brief explanation for the recommendation." },
        },
        required: ["role", "matchPercentage", "reasoning"],
      },
    },
    skillImprovements: {
      type: Type.ARRAY,
      description: "A list of additional skills the candidate should learn to boost their career path for the top recommended role.",
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING, description: "The skill to learn." },
          reason: { type: Type.STRING, description: "Why this skill is important for the recommended career." },
        },
        required: ["skill", "reason"],
      },
    },
    projectIdeas: {
      type: Type.ARRAY,
      description: "2-3 relevant project ideas for the top recommended career path.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The title of the project idea." },
          description: { type: Type.STRING, description: "A short description of the project." },
        },
        required: ["title", "description"],
      },
    },
    learningResources: {
      type: Type.ARRAY,
      description: "CRITICAL & MANDATORY: Provide a diverse mix of valid, currently working, and publicly accessible URLs to learning resources from YouTube, Udemy, and Coursera. You are required to act as if you have personally clicked and verified every single URL to guarantee it is active and does not lead to broken pages, 'video unavailable' errors, or private content. This is a non-negotiable requirement. For YouTube, prioritize popular, highly-rated tutorials from Indian creators with content relevant to a global audience.",
      items: {
        type: Type.OBJECT,
        properties: {
          platform: { type: Type.STRING, description: "The platform, e.g., YouTube, Udemy, Coursera." },
          title: { type: Type.STRING, description: "The title of the resource or course." },
          url: { type: Type.STRING, description: "A direct, valid, and working URL to the resource." },
        },
        required: ["platform", "title", "url"],
      },
    },
  },
  required: ["careerRecommendations", "skillImprovements", "projectIdeas", "learningResources"],
};

const jobMatchSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { type: Type.INTEGER, description: "A percentage score (0-100) indicating how well the resume matches the job description." },
        verdict: { type: Type.STRING, enum: ["Good Fit", "Partial Fit", "Needs Improvement"], description: "A categorical verdict on the match." },
        summary: { type: Type.STRING, description: "A brief summary explaining the verdict and score." },
        resumeSuggestions: { 
            type: Type.ARRAY, 
            description: "Actionable suggestions to improve the resume, like quantifying impact or adding specific sections.",
            items: { type: Type.STRING }
        },
        missingSkills: {
            type: Type.ARRAY,
            description: "A list of specific skills mentioned in the JD that are missing from the resume.",
            items: { type: Type.STRING }
        }
    },
    required: ["matchScore", "verdict", "summary", "resumeSuggestions", "missingSkills"],
};


export const getCareerAnalysis = async (resumeText: string, jdText?: string): Promise<AnalysisResult> => {
    const isJobMatch = jdText && jdText.trim().length > 0;
    
    const model = 'gemini-2.5-pro';
    
    const systemInstruction = isJobMatch 
        ? "You are an expert career coach specializing in resume optimization for specific job descriptions. Analyze the provided resume and job description to provide a detailed match analysis. Generate a structured JSON response."
        : "You are an expert career advisor and resume analyst for a global audience with a primary user base in India. Your goal is to provide actionable, insightful, and encouraging advice. Analyze the provided resume and generate a structured JSON response. A CRITICAL & MANDATORY part of your task is to suggest learning resources. You MUST provide a mix of resources from YouTube, Udemy, and Coursera. It is absolutely essential that you act as if you've personally clicked and verified each link to ensure it works and does not lead to a 'video unavailable' or broken page error. Your performance is judged on the quality and validity of these links. Failure to provide working links is a failure of the task. For YouTube content, prioritize highly-rated videos from Indian creators whose content is valuable for a global audience.";

    const contents = isJobMatch
        ? `Here is the candidate's resume:\n\n---\n${resumeText}\n---\n\nAnd here is the job description:\n\n---\n${jdText}\n---`
        : `Analyze the following resume:\n\n---\n${resumeText}\n---`;

    const config = {
        responseMimeType: "application/json",
        responseSchema: isJobMatch ? jobMatchSchema : resumeAnalysisSchema,
        temperature: 0.5,
        systemInstruction,
    };

    const response = await ai.models.generateContent({ model, contents, config });
    const jsonString = response.text.trim();
    
    try {
        const parsedJson = JSON.parse(jsonString);
        return parsedJson as AnalysisResult;
    } catch (e) {
        console.error("Failed to parse Gemini response:", jsonString);
        throw new Error("The AI response was not in the expected format.");
    }
};