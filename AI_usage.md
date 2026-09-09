# AI Usage

AI was used in two places in this project: during development and inside the product.

## 1. AI during development

I used AI assistance for:

* discussing the MVP scope 
* debugging TypeScript/Express issues
* improving some implementation details

I tested the generated suggestions locally and changed them when they did not fit the project.

## 2. AI inside the product

The platform uses an AI evaluator to review a learner's LLD submission.

The AI evaluates areas such as:

* Requirement understanding
* Class responsibilities
* Coupling and cohesion
* Encapsulation and interfaces
* Abstraction
* Extensibility
* Edge cases and testability
* Explanation quality

The AI is instructed to return structured JSON containing:


{
  "overallScore": 0,
  "summary": "",
  "strengths": [],
  "improvements": []
}


## Why AI is not the only evaluator

I added a separate `RuleEvaluator` for deterministic checks.

```text
RuleEvaluator
    ↓
Basic deterministic checks

AIEvaluator
    ↓
Design judgement
```

The two results are combined before storing the final evaluation.

This avoids making the whole evaluation depend on a single LLM score.

## Handling weak submissions

During testing I noticed that an LLM can sometimes give a reasonable score to a submission that contains very little useful information.

To reduce this, the application validates the main submission sections and the AI prompt tells the evaluator not to assume information that the learner did not provide.

## Limitations

AI feedback can still be imperfect. It may misunderstand an unusual but valid design or give slightly different feedback for similar submissions.

For this reason, the AI score is treated as feedback rather than an absolute measure of interview performance.
