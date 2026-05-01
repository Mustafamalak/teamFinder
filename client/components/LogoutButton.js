"use client";

import { logout } from "../utils/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="rounded-2xl border border-white/10 bg-red-400/20 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:scale-105 hover:bg-red-300 hover:text-black"
    >
      Logout
    </button>
  );
}
