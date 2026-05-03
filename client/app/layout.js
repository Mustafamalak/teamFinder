import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TeamFinder",
  description: "Find teammates for projects and hackathons",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(15, 23, 42, 0.95)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              backdropFilter: "blur(16px)",
            },
            success: {
              iconTheme: {
                primary: "#67e8f9",
                secondary: "#020617",
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171",
                secondary: "#020617",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
