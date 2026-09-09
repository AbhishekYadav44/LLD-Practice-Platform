"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Evaluation {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
}

export default function FeedbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const submissionId = searchParams.get("submissionId");

  const [evaluation, setEvaluation] =
    useState<Evaluation | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submissionId) {
      setError("Submission ID is missing");
      setLoading(false);
      return;
    }

    fetchEvaluation();
  }, [submissionId]);

  const fetchEvaluation = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/api/submissions/evaluation/${submissionId}`,
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
          data.message || "Failed to load evaluation"
        );
      }

      setEvaluation(data.evaluation);
    } catch (error: any) {
      setError(
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-gray-400">
            Loading feedback...
          </p>
        </div>
      </main>
    );
  }

  if (error || !evaluation) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-red-400">
            {error || "Evaluation not found"}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Your Feedback
          </h1>

          <p className="mt-2 text-gray-400">
            Review your LLD submission and improve your design.
          </p>
        </div>

       

        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
          <p className="text-sm text-gray-400">
            Overall Score
          </p>

          <p className="mt-2 text-6xl font-bold">
            {evaluation.overallScore}
          </p>

          <p className="mt-2 text-gray-500">
            out of 100
          </p>
        </div>

      

        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold">
            Summary
          </h2>

          <p className="mt-3 leading-7 text-gray-400">
            {evaluation.summary}
          </p>
        </div>

      

        <div className="mb-6 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold">
            Strengths
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-400">
            {evaluation.strengths.map(
              (strength, index) => (
                <li key={index}>
                  {strength}
                </li>
              )
            )}
          </ul>
        </div>

      

        <div className="mb-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold">
            Areas to Improve
          </h2>

          <ul className="mt-4 list-disc space-y-3 pl-5 text-gray-400">
            {evaluation.improvements.map(
              (improvement, index) => (
                <li key={index}>
                  {improvement}
                </li>
              )
            )}
          </ul>
        </div>

     

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/problems")}
            className="rounded-lg bg-white px-5 py-3 font-medium text-gray-900 hover:bg-gray-200"
          >
            Try Another Problem
          </button>

          <button
            onClick={() => router.push("/history")}
            className="rounded-lg border border-gray-700 px-5 py-3 font-medium text-white hover:bg-gray-900"
          >
            View History
          </button>
        </div>

      </div>
    </main>
  );
}