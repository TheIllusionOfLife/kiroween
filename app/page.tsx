"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { GeneratorForm } from "@/components/generator/GeneratorForm";
import { Header } from "@/components/Header";
import { useGeneratorStore } from "@/lib/store";

function HomeContent() {
  const searchParams = useSearchParams();
  const editSiteId = searchParams.get("edit");
  const { enterEditMode } = useGeneratorStore();
  
  // Fetch site data if in edit mode
  const siteData = useQuery(
    api.sites.get,
    editSiteId ? { id: editSiteId as Id<"sites"> } : "skip"
  );

  // Load site into edit mode when data is available
  useEffect(() => {
    if (editSiteId && siteData) {
      enterEditMode(editSiteId as Id<"sites">, {
        name: siteData.name,
        hobby: siteData.hobby,
        email: siteData.email,
        theme: siteData.theme,
        addMusic: siteData.addMusic,
        addCursor: siteData.addCursor,
        addGifs: siteData.addGifs,
        addPopups: siteData.addPopups ?? false,
        addRainbowText: siteData.addRainbowText ?? false,
        bgmTrack: siteData.bgmTrack,
        soundEffects: siteData.soundEffects ?? false,
        customFonts: siteData.customFonts,
        customColors: siteData.customColors,
      });
    }
  }, [editSiteId, siteData, enterEditMode]);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-8 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {editSiteId ? "Edit Your Retro Homepage" : "Create Your Retro Homepage"}
          </h1>
          <p className="text-2xl text-white drop-shadow-md">
            ✨ Relive the glory days of GeoCities ✨
          </p>
        </div>

        <GeneratorForm />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </main>
  );
}
