"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { presets } from "@/lib/presets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSiteHTML } from "@/lib/site-generator";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function GeneratorForm() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("neon");
  const [addMusic, setAddMusic] = useState(true);
  const [addCursor, setAddCursor] = useState(true);
  const [addGifs, setAddGifs] = useState(true);
  const [addPopups, setAddPopups] = useState(true);
  const [addRainbowText, setAddRainbowText] = useState(true);
  const [maxChaos, setMaxChaos] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const createSite = useMutation(api.sites.create);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    const config = {
      name,
      hobby,
      email: email || undefined,
      theme,
      addMusic,
      addCursor,
      addGifs,
      addPopups,
      addRainbowText,
      createdAt: Date.now(),
    };

    const html = generateSiteHTML(config);
    setPreviewHTML(html);
    setShowPreview(true);

    // Save to Convex
    try {
      await createSite(config);
    } catch (error) {
      console.error("Failed to save site:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([previewHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "-")}-90s-site.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setName(preset.config.name);
      setHobby(preset.config.hobby);
      setEmail(preset.config.email);
      setTheme(preset.config.theme);
      setAddMusic(preset.config.addMusic);
      setAddCursor(preset.config.addCursor);
      setAddGifs(preset.config.addGifs);
      setAddPopups(preset.config.addPopups);
      setAddRainbowText(preset.config.addRainbowText);
    }
  };

  return (
    <div className="space-y-8">
      {/* Preset Selector */}
      <Card className="border-4 border-yellow-400 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500">
          <CardTitle className="text-white text-2xl">
            🚀 Quick Start Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset.id)}
                className="p-4 border-3 border-purple-400 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all text-left group"
              >
                <div className="text-4xl mb-2">{preset.emoji}</div>
                <div className="font-bold text-purple-600 group-hover:text-purple-800">
                  {preset.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {preset.description}
                </div>
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Click a template to auto-fill the form, then customize it!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-4 border-purple-600 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600">
            <CardTitle className="text-white text-2xl">
              Enter Your Info:
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="border-2"
              />
            </div>

            <div>
              <Label htmlFor="hobby">Your Favorite Hobby</Label>
              <Input
                id="hobby"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                placeholder="What do you love?"
                required
                className="border-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Your Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border-2"
              />
            </div>

            <div>
              <Label htmlFor="theme">Choose Your Vibe:</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="neon">Neon Dreams</SelectItem>
                  <SelectItem value="space">Space Jam</SelectItem>
                  <SelectItem value="rainbow">Rainbow Explosion</SelectItem>
                  <SelectItem value="matrix">Matrix Mode</SelectItem>
                  <SelectItem value="geocities">GeoCities Classic</SelectItem>
                  <SelectItem value="angelfire">Angelfire Special</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="music"
                  checked={addMusic}
                  onCheckedChange={(checked) => setAddMusic(checked as boolean)}
                />
                <Label htmlFor="music" className="cursor-pointer">
                  Add MIDI Background Music 🎵
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cursor"
                  checked={addCursor}
                  onCheckedChange={(checked) => setAddCursor(checked as boolean)}
                />
                <Label htmlFor="cursor" className="cursor-pointer">
                  Sparkle Cursor Trail ✨
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gifs"
                  checked={addGifs}
                  onCheckedChange={(checked) => setAddGifs(checked as boolean)}
                />
                <Label htmlFor="gifs" className="cursor-pointer">
                  Maximum GIFs Mode 🔥
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popups"
                  checked={addPopups}
                  onCheckedChange={(checked) => setAddPopups(checked as boolean)}
                />
                <Label htmlFor="popups" className="cursor-pointer">
                  Annoying Popups 🚨
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rainbow"
                  checked={addRainbowText}
                  onCheckedChange={(checked) => setAddRainbowText(checked as boolean)}
                />
                <Label htmlFor="rainbow" className="cursor-pointer">
                  Rainbow Text 🌈
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="maxChaos"
                  checked={maxChaos}
                  onCheckedChange={(checked) => setMaxChaos(checked as boolean)}
                />
                <Label htmlFor="maxChaos" className="cursor-pointer">
                  MAXIMUM CHAOS MODE 💥
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg py-6"
            >
              🚀 GENERATE MY SITE 🚀
            </Button>
          </form>
        </CardContent>
      </Card>

        {showPreview && (
        <Card className="border-4 border-pink-500 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-2xl">
                Your Awesome Website:
              </CardTitle>
              <Button
                onClick={handleDownload}
                variant="secondary"
                className="font-bold"
              >
                💾 Download
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              srcDoc={previewHTML}
              className="w-full h-[600px] border-0"
              title="Preview"
            />
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  );
}
