"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}

interface HistoryItem {
  attemptId: string;
  problem: Problem;
  status: string;
  score: number | null;
  submittedAt: string | null;
}

export default function HistoryPage() {
  const router = useRouter();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:4000/api/attempts/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load history"
        );
      }

      setHistory(data.history);
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
        <div className="mx-auto max-w-5xl">
          <p className="text-gray-400">
            Loading history...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold">
      Attempt History
    </h1>

    <p className="mt-2 text-gray-400">
      Review your previous LLD practice attempts.
    </p>
  </div>

  <div className="flex gap-3">
    <button
      onClick={() => router.push("/")}
      className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
    >
      Home
    </button>

    <button
      onClick={() => router.push("/problems")}
      className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-900"
    >
      Problems
    </button>

    <button
      onClick={() => router.back()}
      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
    >
      ← Back
    </button>
  </div>
</div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Attempt History
          </h1>

          <p className="mt-2 text-gray-400">
            Review your previous LLD practice attempts.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
            <p className="text-gray-400">
              No attempts yet.
            </p>

            <button
              onClick={() => router.push("/problems")}
              className="mt-5 rounded-lg bg-white px-5 py-3 font-medium text-gray-900 hover:bg-gray-200"
            >
              Start Practicing
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.attemptId}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6"
              >
                <div className="flex items-center justify-between gap-4">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.problem.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {item.problem.difficulty}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                    {item.status}
                  </span>

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Score
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {item.score !== null
                        ? `${item.score}/100`
                        : "—"}
                    </p>
                  </div>

                  {item.submittedAt && (
                    <p className="text-sm text-gray-500">
                      {new Date(
                        item.submittedAt
                      ).toLocaleString()}
                    </p>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}