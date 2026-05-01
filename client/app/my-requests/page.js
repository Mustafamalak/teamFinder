"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API_URL from "../../utils/api";
import LogoutButton from "../../components/LogoutButton";

export default function MyRequests() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/requests/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Failed to fetch requests");
        return;
      }

      setRequests(data);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetchMyRequests();
  }, [router]);

  const statusClass = {
    pending: "bg-yellow-300 text-black",
    accepted: "bg-green-300 text-black",
    rejected: "bg-red-300 text-black",
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#060816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <Link href="/dashboard" className="text-xl font-bold">
            TeamFinder
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
          >
            Dashboard
          </Link>
          <LogoutButton />
        </nav>

        <div className="mb-10">
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-200">
            Sent requests
          </p>

          <h1 className="text-5xl font-black tracking-tight">
            My{" "}
            <span className="bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Requests
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Track the teams you have requested to join.
          </p>
        </div>

        {loading ? (
          <div className="h-60 animate-pulse rounded-3xl bg-white/10" />
        ) : requests.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl">
            <h2 className="text-2xl font-bold">No requests yet</h2>
            <p className="mt-2 text-gray-400">
              Go to dashboard and request to join a team.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {request.postId?.title || "Deleted Post"}
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">
                      {request.postId?.description ||
                        "This post is unavailable."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {request.postId?.requiredSkills?.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-cyan-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      statusClass[request.status] || "bg-white text-black"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
