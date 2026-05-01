import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#060816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-12%] top-[-15%] h-[32rem] w-[32rem] rounded-full bg-purple-600/30 blur-[140px]" />
        <div className="absolute right-[-12%] top-[15%] h-[32rem] w-[32rem] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-[-18%] left-[25%] h-[32rem] w-[32rem] rounded-full bg-pink-500/20 blur-[140px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <nav className="mb-16 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TeamFinder
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-2xl px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="grid flex-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl">
              For college projects, hackathons & competitions
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Find the right{" "}
              <span className="bg-linear-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                teammates
              </span>{" "}
              before the deadline.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              TeamFinder helps students discover teammates based on skills,
              interests, and project needs — without messy WhatsApp spam or
              random group hunting.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-2xl bg-linear-to-r from-cyan-300 to-purple-300 px-7 py-4 text-center font-bold text-black transition hover:scale-[1.03]"
              >
                Start Finding Teams
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-white/10 bg-white/10 px-7 py-4 text-center font-bold text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
              >
                Login
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-3xl font-black">01</p>
                <p className="mt-2 text-sm text-gray-400">
                  Create your profile
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-3xl font-black">02</p>
                <p className="mt-2 text-sm text-gray-400">Post team needs</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <p className="text-3xl font-black">03</p>
                <p className="mt-2 text-sm text-gray-400">Accept requests</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-linear-to-r from-cyan-300/20 to-purple-400/20 blur-3xl" />

            <div className="relative rotate-1 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl transition hover:rotate-0">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Live team post</p>
                    <h3 className="mt-1 text-xl font-bold">
                      SIH Frontend Squad
                    </h3>
                  </div>

                  <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-black">
                    Open
                  </span>
                </div>

                <p className="mb-5 text-sm leading-6 text-gray-300">
                  Need a React + Tailwind developer for a hackathon prototype.
                  Backend is ready, looking for someone who can build clean UI.
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {["React", "Next.js", "Tailwind", "UI/UX"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-cyan-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full rounded-2xl bg-white py-3 font-bold text-black">
                  Request to Join
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-sm text-gray-400">Team Size</p>
                  <p className="mt-1 text-2xl font-black">3/4</p>
                </div>

                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-sm text-gray-400">Requests</p>
                  <p className="mt-1 text-2xl font-black">12</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl md:block">
              <p className="text-sm text-gray-400">Matched skill</p>
              <p className="mt-1 font-bold text-cyan-200">Frontend Dev</p>
            </div>

            <div className="absolute -right-8 -top-8 hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl md:block">
              <p className="text-sm text-gray-400">Status</p>
              <p className="mt-1 font-bold text-purple-200">Team Building</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
