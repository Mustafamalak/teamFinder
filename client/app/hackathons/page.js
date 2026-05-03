"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import API_URL from "../../utils/api";
import LogoutButton from "../../components/LogoutButton";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Hackathons() {
  const router = useRouter();

  const [hackathons, setHackathons] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHackathons = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (keyword.trim()) params.append("keyword", keyword.trim());
      if (mode) params.append("mode", mode);

      const url = `${API_URL}/hackathons${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to fetch hackathons");
        return;
      }

      setHackathons(data.hackathons || []);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <nav className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <Link href="/dashboard" className="text-xl font-bold">
            TeamFinder
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-black"
            >
              Dashboard
            </Link>

            <Link
              href="/add-hackathon"
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              Add Hackathon
            </Link>

            <LogoutButton />
          </div>
        </nav>

        <div className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-200">
              Discover opportunities
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Find upcoming{" "}
              <span className="bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                hackathons
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Browse hackathon listings shared by students and open official
              registration links directly.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="mb-4 text-lg font-semibold">Search hackathons</h3>

            <div className="space-y-4">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search title/platform"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
              />

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              >
                <option className="bg-[#060816]" value="">
                  All modes
                </option>
                <option className="bg-[#060816]" value="Online">
                  Online
                </option>
                <option className="bg-[#060816]" value="Offline">
                  Offline
                </option>
                <option className="bg-[#060816]" value="Hybrid">
                  Hybrid
                </option>
              </select>

              <button
                onClick={fetchHackathons}
                className="w-full rounded-2xl bg-linear-to-r from-cyan-300 to-purple-300 px-4 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl bg-white/10"
              />
            ))}
          </div>
        ) : hackathons.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl">
            <h2 className="text-2xl font-bold">No hackathons found</h2>
            <p className="mt-2 text-gray-400">
              Add a hackathon listing to help other students.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon._id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/40"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-cyan-200">
                        {hackathon.platform}
                      </p>
                      <h2 className="mt-1 text-xl font-bold">
                        {hackathon.title}
                      </h2>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                      {hackathon.mode}
                    </span>
                  </div>

                  <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-300">
                    {hackathon.description}
                  </p>

                  <p className="mb-4 text-sm text-gray-400">
                    Deadline:{" "}
                    <span className="font-semibold text-white">
                      {formatDate(hackathon.deadline)}
                    </span>
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {hackathon.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-purple-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-3">
    <Link
      href={`/create-post?hackathonTitle=${encodeURIComponent(
        hackathon.title
      )}&hackathonId=${hackathon._id}`}
      className="block w-full rounded-2xl bg-linear-to-r from-cyan-300 to-purple-300 px-4 py-3 text-center text-sm font-bold text-black transition hover:scale-[1.02]"
    >
      Create Team for this
    </Link>

    <a
      href={hackathon.registrationLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-cyan-100"
    >
      Register Officially
    </a>
  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}