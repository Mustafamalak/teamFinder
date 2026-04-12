import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="mb-4 text-4xl font-bold">TeamFinder</h1>
      <p className="mb-8 text-center text-gray-600">
        Find teammates for hackathons, projects, and competitions.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded bg-black px-5 py-3 text-white"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded border px-5 py-3"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}