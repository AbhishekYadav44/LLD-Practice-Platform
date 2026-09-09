# Research Note

## Problem I am solving

LLD practice platform is not only about knowing design patterns. A candidate needs to understand requirements, identify classes, assign responsibilities and explain why the design can handle future changes.

Most practice resources help with finding problems, but I wanted to focus on the part after solving the problem: **submitting the design and getting useful feedback**.

## What I researched

I looked at a few LLD practice resources and discussions:

* **LLD Arena** — https://github.com/mightbeanshuu/lld-arena
* **Low Level Design repository** — https://github.com/mithran77/low-level-design
* **Reddit LLD discussion** — https://www.reddit.com/r/LowLevelDesign/comments/1ov8prc/tutorial_how_to_approach_low_level_design/
* **Reddit LLD interview discussion** — https://www.reddit.com/r/leetcode/comments/1jw5ede/low_level_design_lld_interview_disambiguation/

## What I noticed

A few things stood out:

1. Problems like Parking Lot, Elevator and Vending Machine are common LLD practice problems.
2. Understanding requirements and responsibilities is more important than simply mentioning design patterns.
3. A score alone is not very useful. Candidates need to know what they did well and what they should improve.
4. Code execution or diagram evaluation can make a practice platform much more complicated.

## My product direction

For the MVP I decided to keep the scope small:

* 3 LLD problems
* Structured text submission
* Rule-based checks
* AI-based feedback
* Attempt history

The candidate fills:

Requirements
Assumptions
Classes
Responsibilities
Relationships
Design Approach
Edge Cases


I chose structured text because it lets me focus on the LLD thinking process without adding code execution or diagram parsing.

I also kept the application as a monolith because the current scope does not need microservices.

## Main gap I wanted to address

The main gap I focused on is the feedback loop:

**Problem → Design → Submit → Feedback → Review → Try again**

That became the main direction of my MVP.
