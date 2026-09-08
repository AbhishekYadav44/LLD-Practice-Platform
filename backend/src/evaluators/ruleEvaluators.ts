import type { Evaluator , EvaluationResult} from "./evaluator.js";

class RuleEvaluator implements Evaluator {
  async evaluate(content: string): Promise<EvaluationResult> {
    const text = content.toLowerCase();

    let score = 0;
    const improvements: string[] = [];

    if (text.includes("requirement")) {
      score += 15;
    } else {
      improvements.push("Explain the requirements clearly.");
    }

    if (text.includes("class")) {
      score += 15;
    } else {
      improvements.push("Mention the main classes in your design.");
    }

    if (text.includes("responsibilities")) {
      score += 15;
    } else {
      improvements.push("Clearly define responsibilities of each class.");
    }

    if (text.includes("relationship")) {
      score += 15;
    } else {
      improvements.push("Explain relationships between classes.");
    }

    if (text.includes("encapsulation")) {
      score += 10;
    } else {
      improvements.push("Explain how encapsulation is maintained.");
    }

    if (text.includes("abstraction")) {
      score += 10;
    } else {
      improvements.push("Mention where abstraction is useful.");
    }

    if (text.includes("edge case")) {
      score += 10;
    } else {
      improvements.push("Consider important edge cases.");
    }

    if (text.includes("extensib")) {
      score += 10;
    } else {
      improvements.push("Explain how the design can be extended.");
    }

    return {
      overallScore: score,
      summary:
        score >= 70
          ? "Good LLD structure with most important areas covered."
          : "The design covers some important areas but needs more detail.",
      improvements,
    };
  }
}

export default RuleEvaluator;