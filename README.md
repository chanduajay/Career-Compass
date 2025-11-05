# 🚀 Career-Compass  
**Smart Resume & Job-Match Advisor**  

Welcome to **Career-Compass**, the sleek, AI-powered web app built to transform how you approach career growth. Whether you're a fresher or a seasoned professional, upload your resume (and optionally a job description) — get tailored career role suggestions, skill gaps, project ideas, learning resources, and resume-fit analysis in one elegant interface.  

---

## ✨ Why This App Stands Out  

- Two-panel user interface:  
  - **Left** → Upload your resume (choose fresher or experienced)  
  - **Right** → (Optional) Upload a job description to check fit  
- Intelligent role prediction: suggests job titles based on your resume content  
- Skill gap analysis: uncovers what you’re missing to level up  
- Project-and-learning bundle: curated project ideas + free course links for each recommended role  
- Resume-vs-job-match check: calculates fit score, delivers verdict and actionable corrections  
- Built for **all devices** — mobile, tablet, laptop — clean, modern and responsive  

---

## 🛠  Tech Stack  

- Backend: **Python**, **Flask**  
- NLP & ML: TF-IDF vectorizer + Logistic Regression (for core role prediction)  
- External API: OpenAI ChatGPT API (for dynamic insights and recommendations)  
- Resume parsing: PDF/DOCX extraction via PyMuPDF / python-docx → cleaned text  
- Frontend: HTML5, Bootstrap 5, responsive layout  
- Database: MySQL (or equivalent) for storing user data & results  
- Deployment: Cloud-platform ready (e.g., Render, Heroku)  

---

## 🎬 Demo Screenshots  

*Add your screenshots or GIFs here to showcase the UI and animations.*  

---

## 🧭 How It Works  

1. **Upload Resume** → The system extracts skills, education, experience.  
2. **Predict Career Roles** → Based on extracted text, the model suggests top job roles.  
3. **Skill Gap + Project Ideas + Resources** → For each role, it provides missing skills, project ideas, recommended free resources.  
4. *(Optional)* **Upload Job Description** → The system compares your resume vs the job description and returns:  
   - Match score (0-100%)  
   - Verdict: Good Fit / Partial Fit / Needs Improvement  
   - Recommendations to tailor your resume for that role  
5. **View & Download Results** → Clear, user-friendly output displayed in browser.  

---

## 🔧 Getting Started  

### Prerequisites  
- Python 3.8+  
- MySQL or alternative DB  
- OpenAI API Key (to unlock advanced insight generation)  
- Install dependencies:  
  ```bash
  pip install -r requirements.txt
