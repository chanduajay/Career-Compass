// For Resume-Only Analysis
export interface CareerInsight {
  role: string;
  matchPercentage: number;
  reasoning: string;
}

export interface SkillImprovement {
  skill: string;
  reason: string;
}

export interface ProjectIdea {
  title: string;
  description: string;
}

export interface LearningResource {
  platform: string; // e.g., Udemy, YouTube, Coursera
  title: string;
  url: string;
}

export interface ResumeAnalysisResult {
  careerRecommendations: CareerInsight[];
  skillImprovements: SkillImprovement[];
  projectIdeas: ProjectIdea[];
  learningResources: LearningResource[];
}

// For Resume + JD Match Analysis
export interface JobMatchResult {
  matchScore: number;
  verdict: 'Good Fit' | 'Partial Fit' | 'Needs Improvement';
  summary: string;
  resumeSuggestions: string[];
  missingSkills: string[];
}

// Union type for the result state
export type AnalysisResult = ResumeAnalysisResult | JobMatchResult | null;

export const isJobMatchResult = (result: AnalysisResult): result is JobMatchResult => {
    return result !== null && 'matchScore' in result;
}

export const isResumeAnalysisResult = (result: AnalysisResult): result is ResumeAnalysisResult => {
    return result !== null && 'careerRecommendations' in result;
}
