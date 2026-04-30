"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API_URL from "../../utils/api";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      router.replace("/dashboard");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#060816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="relative order-2 overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl lg:order-1"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold">Create account</h2>
            <p className="mt-2 text-gray-400">
              Start finding teammates for your next build.
            </p>

            <div className="mt-8 space-y-5">
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
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-300 to-purple-300 px-5 py-4 font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-cyan-200">
                Login
              </Link>
            </p>
          </div>
        </form>

        <div className="order-1 lg:order-2">
          <Link href="/" className="mb-10 inline-block text-xl font-bold">
            TeamFinder
          </Link>

          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl">
            Build teams. Build faster.
          </p>

          <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
            Meet students who{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              match your skills
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
            Create posts, discover teammates, and collaborate on projects,
            hackathons, and competitions.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-gray-400">Why join?</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-black/20 p-4">
                Skill-based team discovery
              </div>
              <div className="rounded-2xl bg-black/20 p-4">
                Structured join request workflow
              </div>
              <div className="rounded-2xl bg-black/20 p-4">
                Built for college projects and hackathons
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}