"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Problem {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  requirements: string[];
}

export default function ProblemsPage() {
  const router = useRouter();

  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/problems"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch problems");
        }

        setProblems(data.problems || data);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);


  const handleStartPractice = async (problemId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:4000/api/attempts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            problemId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to start practice"
        );
      }

   
      const attemptId = data.attempt._id;

      router.push(`/practice?attemptId=${attemptId}`);
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-gray-400">
            Loading problems...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold">
          LLD Problems
        </h1>

        <p className="mt-2 text-gray-400">
          Choose a problem to start practicing.
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {problem.title}
                </h2>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                  {problem.difficulty}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {problem.description}
              </p>

              <button
                onClick={() =>
                  handleStartPractice(problem._id)
                }
                className="mt-6 w-full rounded-lg bg-white py-3 font-medium text-gray-900 hover:bg-gray-200"
              >
                Start Practice
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}