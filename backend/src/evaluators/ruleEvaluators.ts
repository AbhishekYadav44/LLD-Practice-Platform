
import type { Evaluator, EvaluationResult } from "./evaluator.js";

class RuleEvaluator implements Evaluator {
  async evaluate(content: string): Promise<EvaluationResult> {
    const text = content.toLowerCase();

    let score = 0;

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (text.includes("requirement")) {
      score += 15;
      strengths.push("Requirements are clearly identified.");
    } else {
      improvements.push("Explain the requirements clearly.");
    }

    if (text.includes("class")) {
      score += 15;
      strengths.push("Main classes are identified.");
    } else {
      improvements.push("Mention the main classes in your design.");
    }

    if (text.includes("responsibilities")) {
      score += 15;
      strengths.push("Class responsibilities are explained.");
    } else {
      improvements.push("Clearly define responsibilities of each class.");
    }

    if (text.includes("relationship")) {
      score += 15;
      strengths.push("Relationships between classes are explained.");
    } else {
      improvements.push("Explain relationships between classes.");
    }

    if (text.includes("encapsulation")) {
      score += 10;
      strengths.push("Encapsulation is considered.");
    } else {
      improvements.push("Explain how encapsulation is maintained.");
    }

    if (text.includes("abstraction")) {
      score += 10;
      strengths.push("Abstraction is considered.");
    } else {
      improvements.push("Mention where abstraction is useful.");
    }

    if (text.includes("edge case")) {
      score += 10;
      strengths.push("Edge cases are considered.");
    } else {
      improvements.push("Consider important edge cases.");
    }

    if (text.includes("extensib")) {
      score += 10;
      strengths.push("Extensibility is considered.");
    } else {
      improvements.push("Explain how the design can be extended.");
    }

    return {
      overallScore: score,
      summary:
        score >= 70
          ? "Good LLD structure with most important areas covered."
          : "The design covers some important areas but needs more detail.",
      strengths,
      improvements,
    };
  }
}

export default RuleEvaluator;


