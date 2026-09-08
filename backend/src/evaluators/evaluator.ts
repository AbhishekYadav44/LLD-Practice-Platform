export interface EvaluationResult {
  overallScore: number;
  summary: string;
  improvements: string[];
}

export interface Evaluator {
  evaluate(content: string): Promise<EvaluationResult>;
}