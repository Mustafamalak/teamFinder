"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Link from "next/link";
import API_URL from "../../utils/api";
import LogoutButton from "../../components/LogoutButton";

export default function ManageRequests() {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchIncomingRequests = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/requests/incoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to fetch incoming requests");
        return;
      }

      setRequests(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    const token = localStorage.getItem("token");

    try {
      setUpdatingId(requestId);

      const res = await fetch(`${API_URL}/requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Action failed");
        return;
      }

      fetchIncomingRequests();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      router.replace("/login");
      return;
    }

    fetchIncomingRequests();
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
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-purple-200">
            Owner controls
          </p>

          <h1 className="text-5xl font-black tracking-tight">
            Manage{" "}
            <span className="bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Requests
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Accept or reject students who requested to join your team posts.
          </p>
        </div>

        {loading ? (
          <div className="h-60 animate-pulse rounded-3xl bg-white/10" />
        ) : requests.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl">
            <h2 className="text-2xl font-bold">No incoming requests</h2>
            <p className="mt-2 text-gray-400">
              Create team posts to start receiving join requests.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold">
                        {request.sender?.name || "Unknown Student"}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          statusClass[request.status] || "bg-white text-black"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400">
                      Wants to join:{" "}
                      <span className="font-semibold text-white">
                        {request.postId?.title || "Deleted Post"}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Email: {request.sender?.email || "N/A"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {request.sender?.skills?.length > 0 ? (
                        request.sender.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-cyan-200"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          No skills added yet
                        </span>
                      )}
                    </div>
                  </div>

                  {request.status === "pending" && (
                    <div className="flex gap-3">
                      <button
                        disabled={updatingId === request._id}
                        onClick={() => handleAction(request._id, "accept")}
                        className="rounded-2xl bg-green-300 px-5 py-3 text-sm font-bold text-black transition hover:scale-105 disabled:opacity-60"
                      >
                        Accept
                      </button>

                      <button
                        disabled={updatingId === request._id}
                        onClick={() => handleAction(request._id, "reject")}
                        className="rounded-2xl bg-red-300 px-5 py-3 text-sm font-bold text-black transition hover:scale-105 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
