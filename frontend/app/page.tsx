
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6">

        <nav className="flex items-center justify-between py-6">
          <h1 className="text-xl font-bold tracking-tight">
            LLD Practice
          </h1>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/problems"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  Problems
                </Link>

                <Link
                  href="/history"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  History
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        <section className="flex flex-1 items-center justify-center">
          <div className="max-w-3xl text-center">

            <div className="mb-6 inline-block rounded-full border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-400">
              Practice. Submit. Improve.
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Practice Low Level Design
              <span className="block text-gray-400">
                like an interview.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Solve real-world LLD problems, submit your design, and get
              structured feedback on your classes, responsibilities,
              abstraction, extensibility, and edge cases.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/problems"
                    className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-200"
                  >
                    Start Practicing
                  </Link>

                  <Link
                    href="/history"
                    className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-300 transition hover:bg-gray-900"
                  >
                    View History
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-200"
                  >
                    Start Practicing
                  </Link>

                  <Link
                    href="/login"
                    className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-300 transition hover:bg-gray-900"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

          </div>
        </section>

        <footer className="py-6 text-center text-sm text-gray-600">
          Built for developers preparing for LLD interviews.
        </footer>

      </div>
    </main>
  );
}
