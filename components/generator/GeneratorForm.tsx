"use client";

import { useEffect } from "react";
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
import { useGeneratorStore } from "@/lib/store";
import { validateSiteConfig, validateEmail } from "@/lib/validation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser, SignInButton } from "@clerk/nextjs";

export function GeneratorForm() {
  const { config, updateConfig, previewHtml, setPreviewHtml, isEditMode, editingSiteId, exitEditMode } = useGeneratorStore();
  const saveSite = useMutation(api.sites.saveSite);
  const updateSite = useMutation(api.sites.updateSite);
  const { isSignedIn, user } = useUser();

  // Generate preview whenever config changes
  useEffect(() => {
    if (config.name && config.hobby) {
      const html = generateSiteHTML(config);
      setPreviewHtml(html);
    }
  }, [config, setPreviewHtml]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is signed in and user data is loaded
    if (!isSignedIn || !user) {
      // Guest mode: prompt to sign in
      const shouldSignIn = confirm(
        "🔒 Sign in to save your site!\n\n" +
        "You need to sign in with GitHub to save your site to the gallery.\n\n" +
        "Click OK to sign in, or Cancel to continue as a guest (you can still download your site)."
      );
      
      if (shouldSignIn) {
        // User will be prompted to sign in via the button in the UI
        return;
      } else {
        // User chose to stay as guest
        return;
      }
    }

    // Validate required fields
    const validation = validateSiteConfig(config);
    if (!validation.isValid) {
      alert(`Please fix the following errors:\n\n${validation.errors.join('\n')}`);
      return;
    }

    // Validate email if provided
    if (config.email && !validateEmail(config.email)) {
      alert("Please enter a valid email address (must contain @)");
      return;
    }

    // Save or update to Convex with userId
    try {
      if (!user) {
        alert("Unable to save: user information not loaded. Please try again.");
        return;
      }
      
      if (isEditMode && editingSiteId) {
        // Update existing site (Requirements 19.3-19.10)
        await updateSite({
          siteId: editingSiteId as any, // Type assertion for Id<"sites">
          userId: user.id,
          name: config.name,
          hobby: config.hobby,
          email: config.email,
          theme: config.theme,
          addMusic: config.addMusic,
          addCursor: config.addCursor,
          addGifs: config.addGifs,
          addPopups: config.addPopups,
          addRainbowText: config.addRainbowText,
          bgmTrack: config.bgmTrack,
          soundEffects: config.soundEffects,
          customFonts: config.customFonts,
          customColors: config.customColors,
        });
        alert("Site updated successfully!");
        exitEditMode(); // Exit edit mode after successful update
      } else {
        // Create new site
        await saveSite({
          userId: user.id,
          name: config.name,
          hobby: config.hobby,
          email: config.email,
          theme: config.theme,
          addMusic: config.addMusic,
          addCursor: config.addCursor,
          addGifs: config.addGifs,
          addPopups: config.addPopups,
          addRainbowText: config.addRainbowText,
          bgmTrack: config.bgmTrack,
          soundEffects: config.soundEffects,
          customFonts: config.customFonts,
          customColors: config.customColors,
          createdAt: Date.now(),
        });
        alert("Site saved successfully! Check your gallery to view it.");
      }
    } catch (error) {
      console.error("Failed to save site:", error);
      alert("Failed to save site. Please try again.");
    }
  };

  const sanitizeFilename = (name: string): string => {
    return name
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
      .toLowerCase() // Convert to lowercase
      .slice(0, 50) || 'site'; // Limit length and provide fallback
  };

  const handleDownload = () => {
    if (!previewHtml) return;
    
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizeFilename(config.name)}-90s-site.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      updateConfig({
        name: preset.config.name,
        hobby: preset.config.hobby,
        email: preset.config.email,
        theme: preset.config.theme,
        addMusic: preset.config.addMusic,
        addCursor: preset.config.addCursor,
        addGifs: preset.config.addGifs,
        addPopups: preset.config.addPopups,
        addRainbowText: preset.config.addRainbowText,
        bgmTrack: preset.config.bgmTrack,
        soundEffects: preset.config.soundEffects,
        customFonts: preset.config.customFonts,
        customColors: preset.config.customColors,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Preset Selector */}
      {isEditMode && (
        <Card className="border-4 border-blue-400 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-600">
            <CardTitle className="text-white text-2xl flex justify-between items-center">
              <span>✏️ Edit Mode</span>
              <Button
                type="button"
                onClick={exitEditMode}
                variant="secondary"
                className="text-sm"
              >
                Cancel Edit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-center text-gray-700">
              You are editing an existing site. Make your changes and click "Update Site" to save.
            </p>
          </CardContent>
        </Card>
      )}
      
      {!isEditMode && (
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
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-4 border-purple-600 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600">
            <CardTitle className="text-white text-2xl">
              Enter Your Info:
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                value={config.name}
                onChange={(e) => updateConfig({ name: e.target.value })}
                placeholder="Enter your name"
                required
                className="border-2"
              />
            </div>

            <div>
              <Label htmlFor="hobby">Your Favorite Hobby *</Label>
              <Input
                id="hobby"
                value={config.hobby}
                onChange={(e) => updateConfig({ hobby: e.target.value })}
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
                value={config.email || ""}
                onChange={(e) => updateConfig({ email: e.target.value || undefined })}
                placeholder="your@email.com"
                className="border-2"
              />
            </div>

            <div>
              <Label htmlFor="theme">Choose Your Vibe: *</Label>
              <Select value={config.theme} onValueChange={(value) => updateConfig({ theme: value })}>
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

            <div>
              <Label htmlFor="bgmTrack">Background Music (optional)</Label>
              <Select 
                value={config.bgmTrack || "none"} 
                onValueChange={(value) => updateConfig({ bgmTrack: value === "none" ? undefined : value })}
              >
                <SelectTrigger className="border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Music</SelectItem>
                  <SelectItem value="midi-game">🎮 Game Music</SelectItem>
                  <SelectItem value="midi-chill">😎 Chill Vibes</SelectItem>
                  <SelectItem value="midi-epic">🎸 Epic Soundtrack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-bold">Features:</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cursor"
                  checked={config.addCursor}
                  onCheckedChange={(checked) => updateConfig({ addCursor: checked as boolean })}
                />
                <Label htmlFor="cursor" className="cursor-pointer">
                  Sparkle Cursor Trail ✨
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gifs"
                  checked={config.addGifs}
                  onCheckedChange={(checked) => updateConfig({ addGifs: checked as boolean })}
                />
                <Label htmlFor="gifs" className="cursor-pointer">
                  Animated GIFs 🔥
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popups"
                  checked={config.addPopups}
                  onCheckedChange={(checked) => updateConfig({ addPopups: checked as boolean })}
                />
                <Label htmlFor="popups" className="cursor-pointer">
                  Popups & Alerts 🚨
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rainbow"
                  checked={config.addRainbowText}
                  onCheckedChange={(checked) => updateConfig({ addRainbowText: checked as boolean })}
                />
                <Label htmlFor="rainbow" className="cursor-pointer">
                  Rainbow Text 🌈
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="soundEffects"
                  checked={config.soundEffects}
                  onCheckedChange={(checked) => updateConfig({ soundEffects: checked as boolean })}
                />
                <Label htmlFor="soundEffects" className="cursor-pointer">
                  Sound Effects 🔊
                </Label>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label className="text-base font-bold">Custom Fonts (optional):</Label>
              
              <div>
                <Label htmlFor="headingFont" className="text-sm">Heading Font</Label>
                <Select 
                  value={config.customFonts?.heading || "default"} 
                  onValueChange={(value) => updateConfig({ 
                    customFonts: { 
                      ...config.customFonts, 
                      heading: value === "default" ? undefined : value 
                    } 
                  })}
                >
                  <SelectTrigger className="border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Comic Sans (Default)</SelectItem>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="Courier New, monospace">Courier New</SelectItem>
                    <SelectItem value="Impact, fantasy">Impact</SelectItem>
                    <SelectItem value="Times New Roman, serif">Times New Roman</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bodyFont" className="text-sm">Body Font</Label>
                <Select 
                  value={config.customFonts?.body || "default"} 
                  onValueChange={(value) => updateConfig({ 
                    customFonts: { 
                      ...config.customFonts, 
                      body: value === "default" ? undefined : value 
                    } 
                  })}
                >
                  <SelectTrigger className="border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Comic Sans (Default)</SelectItem>
                    <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                    <SelectItem value="Courier New, monospace">Courier New</SelectItem>
                    <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                    <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label className="text-base font-bold">Custom Colors (optional):</Label>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="bgColor" className="text-xs">Background</Label>
                  <Input
                    id="bgColor"
                    type="color"
                    value={config.customColors?.background || "#ffffff"}
                    onChange={(e) => updateConfig({ 
                      customColors: { 
                        ...config.customColors, 
                        background: e.target.value 
                      } 
                    })}
                    className="h-10 cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="textColor" className="text-xs">Text</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={config.customColors?.text || "#000000"}
                    onChange={(e) => updateConfig({ 
                      customColors: { 
                        ...config.customColors, 
                        text: e.target.value 
                      } 
                    })}
                    className="h-10 cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="linkColor" className="text-xs">Links</Label>
                  <Input
                    id="linkColor"
                    type="color"
                    value={config.customColors?.links || "#0000ff"}
                    onChange={(e) => updateConfig({ 
                      customColors: { 
                        ...config.customColors, 
                        links: e.target.value 
                      } 
                    })}
                    className="h-10 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {!isSignedIn && (
                <div className="text-center text-sm text-gray-600 bg-yellow-50 border border-yellow-300 rounded p-2">
                  💡 Sign in to save your site to the gallery!
                </div>
              )}
              <div className="flex gap-2">
                {isSignedIn ? (
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg py-6"
                  >
                    {isEditMode ? '✏️ UPDATE SITE' : '💾 SAVE SITE'}
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button
                      type="button"
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg py-6"
                    >
                      🔒 Sign In to Save
                    </Button>
                  </SignInButton>
                )}
                <Button
                  type="button"
                  onClick={handleDownload}
                  disabled={!previewHtml}
                  variant="secondary"
                  className="font-bold text-lg py-6"
                >
                  ⬇️ Download
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

        {previewHtml && (
        <Card className="border-4 border-pink-500 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500">
            <CardTitle className="text-white text-2xl">
              Live Preview:
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              srcDoc={previewHtml}
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
