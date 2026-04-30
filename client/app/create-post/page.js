"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import API_URL from "../../utils/api";

export default function CreatePost() {
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/login");
  }
}, [router]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    teamSize: "",
  });

  const [loading, setLoading] = useState(false);

  const skillsPreview = form.requiredSkills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      requiredSkills: skillsPreview,
      teamSize: Number(form.teamSize),
    };

    if (!payload.title || !payload.description || !payload.teamSize) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Failed to create post");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      alert("Something went wrong while creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#060816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[15%] h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">
            TeamFinder
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/10 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-black"
          >
            Back to Dashboard
          </Link>
          <LogoutButton />
        </nav>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <aside className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-cyan-200">
              New team opportunity
            </p>

            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Create a{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                team post
              </span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              Share what you are building, what skills you need, and how many
              people can join your team.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-gray-400">Best for</p>
                <p className="mt-1 font-semibold text-white">
                  Hackathons, mini projects, competitions, startup ideas
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-gray-400">Tip</p>
                <p className="mt-1 font-semibold text-white">
                  Mention exact skills like React, Node.js, UI/UX, DSA, ML.
                </p>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative z-10 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Looking for frontend dev for SIH"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your idea, role expectations, timeline, and what kind of teammates you need..."
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Required Skills
                </label>
                <input
                  type="text"
                  name="requiredSkills"
                  value={form.requiredSkills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, UI/UX"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {skillsPreview.length === 0 ? (
                    <p className="text-xs text-gray-500">
                      Separate skills using commas.
                    </p>
                  ) : (
                    skillsPreview.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-cyan-200"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Total Team Size
                </label>
                <input
                  type="number"
                  name="teamSize"
                  value={form.teamSize}
                  onChange={handleChange}
                  placeholder="4"
                  min="2"
                  max="10"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-300 to-purple-300 px-5 py-4 font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Post..." : "Create Team Post"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}