"use client";

import { useEffect, useState } from "react";
import API_URL from "../../utils/api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data.posts) {
        setPosts(data.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
        <p className="mb-8 text-gray-600">
          Explore open team opportunities.
        </p>

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border bg-white p-6">
            <p>No posts found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>

                <p className="mb-3 text-gray-700">{post.description}</p>

                <div className="mb-2 text-sm text-gray-600">
                  <span className="font-medium">Team size:</span> {post.teamSize}
                </div>

                <div className="mb-2 text-sm text-gray-600">
                  <span className="font-medium">Created by:</span>{" "}
                  {post.createdBy?.name || "Unknown"}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {post.requiredSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}