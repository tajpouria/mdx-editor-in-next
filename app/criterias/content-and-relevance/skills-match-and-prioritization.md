**Objective:** Evaluate how effectively a resume showcases skills relevant to a specific job description and provide actionable recommendations for improvement.

**Input:**

- **Resume Text:**

  <%= resume_text %>

- **Job Description:**

  <%= job_description_text %>

**Instructions for AI:**

Your task is to analyze the provided resume against the job description and provide feedback in three parts: a score, a rationale, and improvement tips.

1.  **Skill Match and Prioritization Score (1-10):** Assign a score from 1 to 10 based on how well the resume demonstrates skills emphasized and required in the job description. Consider both the presence of relevant skills and how effectively the resume prioritizes the most important ones.

    - **10 - Excellent:** The resume clearly and prominently highlights **all** key skills listed in the job description. It effectively prioritizes these skills (e.g., in a summary, skills section, or early in experience bullet points). The skill presentation is compelling and directly relevant to the job.
    - **7-9 - Good:** The resume highlights **most** key skills from the job description. Prioritization is generally good, though some key skills could be more emphasized.
    - **4-6 - Fair:** The resume mentions **some** relevant skills, but may miss several key requirements from the job description. Prioritization of skills is weak or inconsistent.
    - **1-3 - Poor:** The resume **fails to highlight** key skills from the job description. There are significant skill gaps, and relevant skills are not prioritized or effectively presented.

2.  **Rationale for Score:** Explain the assigned score. Specifically:

    - **Skill Overlap:** Describe the degree of overlap between skills listed in the resume and those required/desired in the job description.
    - **Missing/Underemphasized Key Skills:** Identify 2-3 **specific, crucial skills** from the job description that are either missing or significantly underemphasized in the resume. Explain why these are important based on the job description.
    - **Prioritization Assessment:** Comment on how effectively the resume prioritizes relevant skills. Note if the most important skills are presented prominently (e.g., in summary, skills section, first few bullet points of relevant experiences). If prioritization is lacking, explain where and how it could be improved.

3.  **Actionable Improvement Tips:** Provide concrete, actionable advice to enhance the resume's skill match and prioritization for this specific job.

    - **Skill Recommendations:** Suggest **specific skills** the candidate should add or emphasize to better align with the job description. For each suggested skill, explain **where and how** it could be incorporated into the resume (e.g., "Add 'Project Management' to your Skills section and quantify your experience in project management within your Project Manager role bullet points.").
    - **Section Recommendations:** Recommend **specific resume sections** (e.g., "Professional Summary," "Key Skills," "Technical Skills," "Experience bullet points") where the candidate should focus on incorporating the recommended skills.
    - **Prioritization Strategies:** Advise on **how to strategically prioritize** the most crucial skills to make the resume more impactful. This could include:
      - Suggesting placement of key skills in prominent sections.
      - Recommending stronger action verbs to highlight skill application.
      - Advising on quantifying achievements to demonstrate skill proficiency.
      - Suggesting tailoring the Professional Summary to directly address the job requirements.

**Desired Output Format:**

Score: [Score 1-10]
Rationale: [Detailed explanation of the score, addressing skill overlap, missing skills, and prioritization] (Use simple text formatting no markdown or HTML or special characters)
Improvement Tips: [Actionable, specific tips for skill enhancement and prioritization, including section and skill recommendations] (Use simple text formatting no markdown or HTML or special characters)
