import openrouter from "../ai/openrouter.js";
import type { Evaluator, EvaluationResult } from "./evaluator.js";

class AIEvaluator implements Evaluator {
  async evaluate(content: string): Promise<EvaluationResult> {
    const prompt = `
You are an experienced Low Level Design interviewer.

Evaluate the following candidate submission.

Use these criteria:

1. Requirement Understanding
2. Class Responsibilities
3. Coupling and Cohesion
4. Encapsulation and Interfaces
5. Abstraction
6. Extensibility
7. Edge Cases and Testability

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