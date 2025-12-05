"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Header } from "@/components/Header";

export default function GalleryPage() {
  const { isSignedIn, user } = useUser();
  const sites = useQuery(
    api.sites.getUserSites,
    isSignedIn && user ? { userId: user.id } : "skip"
  );
  
  // Batch fetch guestbook counts for all sites
  const siteIds = sites?.map((site) => site._id) ?? [];
  const guestbookCounts = useQuery(
    api.guestbook.getBatchEntriesCounts,
    siteIds.length > 0 ? { siteIds } : "skip"
  );

  // Guest mode: Show sign-in prompt
  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400">
        <Header />
        <div className="max-w-4xl mx-auto px-8 py-16">
          <Card className="border-4 border-yellow-400 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500">
              <CardTitle className="text-white text-3xl text-center">
                🔒 Sign In to View Your Gallery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center space-y-6">
              <p className="text-2xl text-gray-700">
                The gallery shows your personal collection of saved sites.
              </p>
              <p className="text-xl text-gray-600">
                Sign in with GitHub to save sites and build your gallery!
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <SignInButton mode="modal">
                  <button className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-bold text-xl">
                    🚀 Sign In with GitHub
                  </button>
                </SignInButton>
                <Link
                  href="/"
                  className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-bold text-xl"
                >
                  ← Back to Generator
                </Link>
              </div>
              <div className="pt-6 border-t mt-6">
                <p className="text-sm text-gray-500">
                  💡 You can still create and download sites without signing in!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (!sites) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400">
        <Header />
        <div className="p-8 flex items-center justify-center">
          <div className="text-white text-2xl">Loading your sites...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400">
      <Header />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎨 My Gallery 🎨
          </h1>
          <p className="text-2xl text-white drop-shadow-md mb-4">
            Your personal collection of retro sites
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition"
          >
            ← Create Another Site
          </Link>
        </div>

        {sites.length === 0 ? (
          <Card className="border-4 border-purple-600 shadow-2xl">
            <CardContent className="p-12 text-center space-y-4">
              <p className="text-2xl text-gray-600">
                Your gallery is empty! 📭
              </p>
              <p className="text-lg text-gray-500">
                Create your first retro site and save it to see it here!
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition mt-4"
              >
                🚀 Create Your First Site
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <Card
                key={site._id}
                className="border-4 border-purple-600 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
              >
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600">
                  <CardTitle className="text-white text-xl truncate">
                    {site.name}&apos;s Site
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Hobby:</strong> {site.hobby}
                    </p>
                    <p className="text-sm">
                      <strong>Theme:</strong>{" "}
                      <span className="capitalize">{site.theme}</span>
                    </p>
                    <p className="text-sm">
                      <strong>Views:</strong> {site.views} 👀
                    </p>
                    <p className="text-sm">
                      <strong>Guestbook:</strong>{" "}
                      <span>{guestbookCounts?.[site._id] ?? 0} entries 📝</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(site.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/site/${site._id}`}
                        className="flex-1 text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                      >
                        View Site 🌐
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
