"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

function GuestbookCount({ siteId }: { siteId: Id<"sites"> }) {
  const count = useQuery(api.guestbook.getEntriesCount, { siteId });
  return <span>{count ?? 0} entries 📝</span>;
}

export default function GalleryPage() {
  const sites = useQuery(api.sites.list);

  if (!sites) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-8 flex items-center justify-center">
        <div className="text-white text-2xl">Loading awesome sites...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎨 Gallery of Awesome Sites 🎨
          </h1>
          <p className="text-2xl text-white drop-shadow-md mb-4">
            Check out what others have created!
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition"
          >
            ← Create Your Own
          </Link>
        </div>

        {sites.length === 0 ? (
          <Card className="border-4 border-purple-600 shadow-2xl">
            <CardContent className="p-12 text-center">
              <p className="text-2xl text-gray-600">
                No sites yet! Be the first to create one! 🚀
              </p>
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
                    {site.name}'s Site
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
                      <strong>Guestbook:</strong> <GuestbookCount siteId={site._id} />
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
