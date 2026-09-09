"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  requirements: string[];
}

interface Attempt {
  _id: string;
  problemId: Problem;
  status: string;
}

export default function PracticePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const attemptId = searchParams.get("attemptId");

  const [attempt, setAttempt] = useState<Attempt | null>(null);

  const [requirements, setRequirements] = useState("");
  const [assumptions, setAssumptions] = useState("");
  const [classes, setClasses] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [relationships, setRelationships] = useState("");
  const [designApproach, setDesignApproach] = useState("");
  const [edgeCases, setEdgeCases] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!attemptId) {
      setError("Attempt ID is missing");
      setLoading(false);
      return;
    }

    fetchAttempt();
  }, [attemptId]);

  const fetchAttempt = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/attempts/${attemptId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load attempt"
        );
      }

      setAttempt(data.attempt);
    } catch (error: any) {
      setError(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!attemptId) {
      setError("Attempt ID is missing");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const content = `
Requirements:
${requirements}

Assumptions:
${assumptions}

Classes:
${classes}

Responsibilities:
${responsibilities}

Relationships:
${relationships}

Design Approach:
${designApproach}

Edge Cases:
${edgeCases}
`;

      const response = await fetch(
        `http://localhost:5000/api/submissions/${attemptId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Submission failed"
        );
      }

      router.push(
        `/feedback?submissionId=${data.submission._id}`
      );
    } catch (error: any) {
      setError(
        error.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-gray-400">
            Loading problem...
          </p>
        </div>
      </main>
    );
  }

  if (error || !attempt) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-red-400">
            {error || "Attempt not found"}
          </div>
        </div>
      </main>
    );
  }

  const problem = attempt.problemId;

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Problem */}

        <div className="mb-10 rounded-xl border border-gray-800 bg-gray-900 p-6">

          <div className="flex items-center justify-between gap-4">

            <h1 className="text-3xl font-bold">
              {problem.title}
            </h1>

            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
              {problem.difficulty}
            </span>

          </div>

          <p className="mt-4 leading-7 text-gray-400">
            {problem.description}
          </p>

          <div className="mt-6">

            <h2 className="font-semibold">
              Requirements
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-400">

              {problem.requirements.map(
                (requirement, index) => (
                  <li key={index}>
                    {requirement}
                  </li>
                )
              )}

            </ul>

          </div>

        </div>

        {/* Design Form */}

        <form onSubmit={handleSubmit}>

          <h2 className="mb-6 text-2xl font-bold">
            Your Design
          </h2>

          <div className="space-y-6">

            <TextArea
              label="Requirements"
              value={requirements}
              onChange={setRequirements}
              placeholder="Explain your understanding of the requirements..."
            />

            <TextArea
              label="Assumptions"
              value={assumptions}
              onChange={setAssumptions}
              placeholder="What assumptions are you making?"
            />

            <TextArea
              label="Classes"
              value={classes}
              onChange={setClasses}
              placeholder="List the main classes in your design..."
            />

            <TextArea
              label="Responsibilities"
              value={responsibilities}
              onChange={setResponsibilities}
              placeholder="Explain the responsibility of each class..."
            />

            <TextArea
              label="Relationships"
              value={relationships}
              onChange={setRelationships}
              placeholder="Explain how the classes interact with each other..."
            />

            <TextArea
              label="Design Approach"
              value={designApproach}
              onChange={setDesignApproach}
              placeholder="Explain your abstraction, interfaces, patterns, etc..."
            />

            <TextArea
              label="Edge Cases"
              value={edgeCases}
              onChange={setEdgeCases}
              placeholder="Mention important edge cases and how your design handles them..."
            />

          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 w-full rounded-lg bg-white py-3 font-medium text-gray-900 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Submitting..."
              : "Submit Design"}
          </button>

        </form>

      </div>
    </main>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-y rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-gray-500"
      />

    </div>
  );
}