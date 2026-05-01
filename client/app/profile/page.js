"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API_URL from "../../utils/api";
import LogoutButton from "../../components/LogoutButton";

export default function Profile() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    experienceLevel: "Beginner",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const skillsPreview = form.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Failed to fetch profile");
        return;
      }

      setForm({
        name: data.name || "",
        bio: data.bio || "",
        skills: data.skills?.join(", ") || "",
        experienceLevel: data.experienceLevel || "Beginner",
      });
    } catch (error) {
      alert("Something went wrong while loading profile");
    } finally {
      setLoading(false);
    }
  };

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
      name: form.name.trim(),
      bio: form.bio.trim(),
      skills: skillsPreview,
      experienceLevel: form.experienceLevel,
    };

    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Failed to update profile");
        return;
      }

      alert("Profile updated successfully");
    } catch (error) {
      alert("Something went wrong while updating profile");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetchProfile();
  }, [router]);

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
            className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
          >
            Dashboard
          </Link>
          <LogoutButton />
        </nav>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <aside className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-cyan-200">
              Student profile
            </p>

            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Complete your{" "}
              <span className="bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                profile
              </span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-300">
              Add your skills and experience so team owners can evaluate your
              join requests properly.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm text-gray-400">Profile strength</p>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-cyan-300 to-purple-300 transition-all"
                  style={{
                    width: `${
                      form.name && form.bio && skillsPreview.length > 0
                        ? "100%"
                        : form.name && skillsPreview.length > 0
                          ? "70%"
                          : "35%"
                    }`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm text-gray-300">
                {form.name && form.bio && skillsPreview.length > 0
                  ? "Strong profile"
                  : "Add bio and skills to improve visibility"}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {skillsPreview.length > 0 ? (
                skillsPreview.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-cyan-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Your skills preview will appear here.
                </p>
              )}
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

            {loading ? (
              <div className="relative z-10 h-96 animate-pulse rounded-3xl bg-white/10" />
            ) : (
              <div className="relative z-10 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-200">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Example: Frontend developer interested in hackathons, UI engineering and product building."
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-200">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB, DSA"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Separate skills using commas.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-200">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={form.experienceLevel}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none focus:border-cyan-300"
                  >
                    <option className="bg-[#060816]" value="Beginner">
                      Beginner
                    </option>
                    <option className="bg-[#060816]" value="Intermediate">
                      Intermediate
                    </option>
                    <option className="bg-[#060816]" value="Advanced">
                      Advanced
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-2xl bg-linear-to-r from-cyan-300 to-purple-300 px-5 py-4 font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving Profile..." : "Save Profile"}
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
