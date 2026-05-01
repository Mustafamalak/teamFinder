"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API_URL from "../../utils/api";
import LogoutButton from "@/components/LogoutButton";

function TiltCard({ post, onJoin }) {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform:
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl transition-all duration-200 hover:border-purple-400/40"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl transition-all group-hover:bg-purple-500/30" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl transition-all group-hover:bg-cyan-500/30" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">{post.title}</h2>
            <p className="mt-1 text-sm text-gray-300">
              by {post.createdBy?.name || "Unknown"}
            </p>
          </div>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
            Team {post.members?.length || 1}/{post.teamSize}
          </span>
        </div>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-300">
          {post.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {post.requiredSkills?.map((skill, index) => (
            <span
              key={index}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-cyan-200"
            >
              {skill}
            </span>
          ))}
        </div>

        <button
          onClick={() => onJoin(post._id)}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-cyan-100"
        >
          Request to Join
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (keyword.trim()) params.append("keyword", keyword.trim());
      if (skill.trim()) params.append("skills", skill.trim());

      const url = `${API_URL}/posts${params.toString() ? `?${params.toString()}` : ""}`;

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRequest = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/requests/${postId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Request failed");
        return;
      }

      alert("Join request sent successfully");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetchPosts();
  }, [router]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-96 w-96 rounded-full bg-pink-500/20 blur-[120px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <nav className="mb-12 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TeamFinder
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-black"
            >
              Profile
            </Link>
            <Link
              href="/my-requests"
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-black"
            >
              My Requests
            </Link>

            <Link
              href="/manage-requests"
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white hover:text-black"
            >
              Manage
            </Link>

            <Link
              href="/create-post"
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              Create Post
            </Link>

            <LogoutButton />
          </div>
        </nav>

        <div className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-200">
              Find teammates faster
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Build your next{" "}
              <span className="bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                winning team
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Discover students looking for teammates for hackathons, projects,
              competitions, and startup ideas.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="mb-4 text-lg font-semibold">Search teams</h3>

            <div className="space-y-4">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by keyword"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
              />

              <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Filter by skill e.g. React"
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-300"
              />

              <button
                onClick={fetchPosts}
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
        ) : posts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl">
            <h2 className="text-2xl font-bold">No posts found</h2>
            <p className="mt-2 text-gray-400">
              Create the first team post and start collaborating.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <TiltCard key={post._id} post={post} onJoin={handleJoinRequest} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
