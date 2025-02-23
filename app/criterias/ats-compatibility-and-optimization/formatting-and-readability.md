**Enhanced Prompt for Resume Formatting and Readability Evaluation**

**Objective:** To critically evaluate the provided resume text for its formatting and readability, with a strong emphasis on its compatibility with Applicant Tracking Systems (ATS) and its overall visual clarity for human recruiters.

**Resume Text:**

<%= resume_text %>

**Instructions for AI Evaluator:**

1. **Comprehensive Score (1-10):** Provide a holistic score on a scale of 1 to 10, assessing the resume's formatting for both ATS compatibility and human readability. Use the following scale as a guide:

   - **10 - Exceptional:** Flawless formatting. Extremely simple, clean, and ATS-optimized. Highly readable, scannable, and visually appealing. Demonstrates best practices in resume formatting.
   - **7-9 - Good to Excellent:** Strong formatting with minor areas for potential improvement. Generally ATS-friendly and readable, but could be further refined for optimal impact.
   - **4-6 - Fair:** Adequate formatting, but contains noticeable issues that could hinder ATS processing or human readability. Requires significant improvements to be truly effective.
   - **1-3 - Poor to Very Poor:** Significant formatting flaws. Likely to be problematic for ATS and difficult for humans to read. Requires substantial reformatting.

2. **Detailed Rationale for Score:** Provide a thorough explanation justifying the assigned score. **Analyze and explain** the following aspects in detail:

   - **ATS Compatibility:** Specifically address elements that impact ATS processing. Consider:
     - **Font Choice:** Evaluate font families (e.g., serif vs. sans-serif, standard fonts) and their ATS-friendliness.
     - **Layout Simplicity:** Assess the complexity of the layout. Are tables, columns, or excessive graphics used? Are section headings clearly defined and easily parsable?
     - **File Type Considerations (Implicit):** While not directly testable from text, consider if the _formatting style_ implied would be suitable for saving as a plain text or PDF file for ATS.
     - **Use of Headers and Footers:** Are headers and footers used in a way that could disrupt ATS parsing of core content?
     - **Symbol and Special Character Usage:** Are non-standard symbols or characters used that might not be recognized by ATS?
   - **Human Readability and Visual Clarity:** Evaluate how easily and effectively a human recruiter can read and scan the resume. Consider:
     - **Font Size and Spacing:** Assess the appropriateness of font size and line spacing for comfortable reading.
     - **Use of Bullet Points and Numbered Lists:** Are bullet points and lists used effectively to break up text and highlight key information? Are they consistently formatted?
     - **Section Headings and Hierarchy:** Are section headings clear, concise, and logically organized? Does the formatting create a clear visual hierarchy?
     - **White Space Utilization:** Is white space used effectively to improve visual appeal and reduce text density? Is there sufficient spacing between sections and lines?
     - **Consistent Styling:** Is there consistency in font styles, bullet point styles, heading styles, and overall formatting throughout the document?

3. **Actionable and Specific Improvement Recommendations:** Provide at least **three** distinct and actionable tips to improve the resume's formatting and readability. Each tip should:

   - **Be Specific:** Instead of vague advice, offer concrete suggestions. For example, instead of "improve font," suggest "switch to a standard sans-serif font like Arial or Calibri."
   - **Be Actionable:** The tips should be things the resume creator can directly implement.
   - **Prioritize Impact:** Focus on tips that will have the most significant positive impact on both ATS-friendliness and human readability.

   Examples of tip categories (AI should generate its own specific tips within these categories):

   - **Simplification of Layout:** Suggestions for removing unnecessary complexity (e.g., tables, excessive columns).
   - **Typography Enhancement:** Specific font recommendations, size adjustments, and spacing improvements.
   - **Visual Organization and Hierarchy:** Tips on using headings, bullet points, white space to improve structure and flow.
   - **Consistency in Styling:** Recommendations for ensuring uniform formatting elements throughout the resume.
   - **ATS Optimization:** Direct tips focused on improving ATS compatibility (e.g., avoid graphics, use plain section headings).

**Desired Output Format:**
Score: [Score 1-10] 
Reason: [Detailed explanation of the score, addressing ATS Compatibility and Human Readability aspects as outlined above] (Use simple text formatting no markdown or HTML or special characters)
Tips for Improvement: [At least three actionable and specific tips for improving formatting and readability] (Use simple text formatting no markdown or HTML or special characters)
