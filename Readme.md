# LLD Practice Platform

A focused MVP for practicing Low Level Design interview problems and getting structured feedback.

**GitHub:** `https://github.com/AbhishekYadav44/LLD-Practice-Platform.git`
Live url : 

## Features

* User signup/login with JWT
* 3 LLD problems: Parking Lot, Elevator System, Vending Machine
* Structured text-based practice
* Rule-based + AI evaluation
* Feedback with strengths and improvements
* Attempt history
* Evaluation failure handling

## Tech Stack

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express.js, TypeScript
* **Database:** MongoDB, Mongoose
* **AI:** OpenRouter

## How to Run

### 1. Clone

```bash
git clone YOUR_GITHUB_REPO_URL
cd YOUR_PROJECT_FOLDER
```

### 2. Backend


cd backend
npm install


Create `.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/lld-practice
PORT=4000
JWT_SECRET=your_secret
OPENROUTER_API_KEY=your_api_key
```

Seed the problems:

```bash
npm run seed
```

Start backend:

```bash
npm run dev
```

Backend runs on `http://localhost:4000`.

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start frontend:

```bash
npm run dev
```

Open `http://localhost:3000`.



## Evaluation

The submission is evaluated using:

* **RuleEvaluator** — deterministic checks
* **AIEvaluator** — LLD design feedback

Both are combined into the final evaluation.

## Attempt States

```text
Started → Evaluating → Completed
                    ↘ Failed
```

The submission is saved before evaluation, so an evaluation failure does not lose the learner's work.

## Documentation

* `RESEARCH.md` — research and product direction
* `DESIGN.md` — architecture and trade-offs
* `AI_USAGE.md` — AI usage
