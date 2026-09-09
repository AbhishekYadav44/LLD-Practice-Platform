import openrouter from "../ai/openrouter.js";
import type { Evaluator, EvaluationResult } from "./evaluator.js";

class AIEvaluator implements Evaluator {
  async evaluate(content: string): Promise<EvaluationResult> {
    const prompt = `
You are an experienced Low Level Design interviewer.

Evaluate the following candidate submission.


Use these criteria:
If the submission is empty, nearly empty, meaningless,
or does not contain an actual LLD design:

- overallScore must be between 0 and 10
- summary must clearly say that no meaningful design was submitted
- strengths should be empty or contain at most one basic point
- improvements should explain that the candidate needs to provide an actual design

Requirement Understanding      /15
Class Responsibilities         /15
Coupling & Cohesion             /15
Encapsulation & Interfaces      /15
Abstraction                     /10
Extensibility                   /10
Edge Cases & Testability        /10
Explanation Quality             /10
                                ----
                                /100

Candidate Submission:
${content}

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add any explanation before or after the JSON.

The JSON must have exactly this structure:

{
  "overallScore": 0,
  "summary": "",
  "strengths": [],
  "improvements": []
}

overallScore must be between 0 and 100.
`;

    const response = await openrouter.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const result = response.choices[0]?.message?.content;

    if (!result) {
      throw new Error("AI evaluator returned empty response");
    }

    console.log("RAW AI RESPONSE:");
    console.log(result);

    const cleanResult = result
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("CLEAN AI RESPONSE:");
    console.log(cleanResult);

    return JSON.parse(cleanResult);
  }
}

export default AIEvaluator;