"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import API_URL from "../../utils/api";
import LogoutButton from "../../components/LogoutButton";

export default function AddHackathon() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    platform: "Unstop",
    description: "",
    registrationLink: "",
    deadline: "",
    mode: "Online",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  const tagsPreview = form.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      title: form.title.trim(),
      platform: form.platform.trim(),
      description: form.description.trim(),
      registrationLink: form.registrationLink.trim(),
      deadline: form.deadline,
      mode: form.mode,
      tags: tagsPreview,
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/hackathons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Failed to add hackathon");
        return;
      }

      toast.success("Hackathon added successfully");
      router.push("/hackathons");
    } catch (error) {
      toast.error("Something went wrong");
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
        <nav className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <Link href="/dashboard" className="text-xl font-bold">
            TeamFinder
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/hackathons"
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              Hackathons
            </Link>
            <LogoutButton />
          </div>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <aside className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-cyan-200">
              Add opportunity
            </p>

            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Share a{" "}
              <span className="bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                hackathon
              </span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              Add official hackathon listings so students can discover
              opportunities and form teams quickly.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-gray-400">Recommended links</p>
              <p className="mt-2 font-semibold">
                Unstop, Devfolio, MLH, college-hosted events
              </p>
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
                  Hackathon Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Smart India Hackathon"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Platform
                </label>
                <input
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  placeholder="Unstop"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
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
                  placeholder="Describe eligibility, theme, rounds, and what students should know..."
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Official Registration Link
                </label>
                <input
                  name="registrationLink"
                  value={form.registrationLink}
                  onChange={handleChange}
                  placeholder="https://unstop.com/..."
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-200">
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none focus:border-cyan-300"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-200">
                    Mode
                  </label>
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none focus:border-cyan-300"
                  >
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
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Tags
                </label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="AI, Web Dev, Open Innovation"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {tagsPreview.length === 0 ? (
                    <p className="text-xs text-gray-500">
                      Separate tags using commas.
                    </p>
                  ) : (
                    tagsPreview.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-purple-200"
                      >
                        {tag}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full rounded-2xl bg-linear-to-r from-cyan-300 to-purple-300 px-5 py-4 font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Adding Hackathon..." : "Add Hackathon"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}