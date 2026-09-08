export interface EvaluationResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
}

export interface Evaluator {
  evaluate(content: string): Promise<EvaluationResult>;
}