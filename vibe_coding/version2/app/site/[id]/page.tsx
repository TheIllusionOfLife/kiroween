"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { generateSiteHTML } from "@/lib/site-generator";
import { useEffect } from "react";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GuestbookWidget } from "@/components/guestbook/GuestbookWidget";

export default function SitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [siteId, setSiteId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((p) => setSiteId(p.id));
  }, [params]);

  const site = useQuery(
    api.sites.get,
    siteId ? { id: siteId as Id<"sites"> } : "skip"
  );
  const incrementViews = useMutation(api.sites.incrementViews);

  useEffect(() => {
    if (site && siteId) {
      incrementViews({ id: siteId as Id<"sites"> });
    }
  }, [site, siteId, incrementViews]);

  if (!site) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-8 flex items-center justify-center">
        <div className="text-white text-2xl">Loading site...</div>
      </div>
    );
  }

  const html = generateSiteHTML({
    name: site.name,
    hobby: site.hobby,
    email: site.email,
    theme: site.theme,
    addMusic: site.addMusic,
    addCursor: site.addCursor,
    addGifs: site.addGifs,
    addPopups: site.addPopups,
    addRainbowText: site.addRainbowText,
    createdAt: site.createdAt,
  });

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${site.name.replace(/\s+/g, "-")}-90s-site.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/gallery"
            className="px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition"
          >
            ← Back to Gallery
          </Link>
          <div className="flex gap-4">
            <Button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700"
            >
              💾 Download
            </Button>
            <div className="px-6 py-2 bg-white text-purple-600 font-bold rounded-lg">
              👀 {site.views} views
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white border-4 border-purple-600 shadow-2xl rounded-lg overflow-hidden">
              <iframe
                srcDoc={html}
                className="w-full h-[800px] border-0"
                title={`${site.name}'s Site`}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <GuestbookWidget siteId={siteId} />
          </div>
        </div>
      </div>
    </main>
  );
}
