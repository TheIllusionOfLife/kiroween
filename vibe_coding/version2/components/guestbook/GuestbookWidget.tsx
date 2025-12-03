"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GuestbookWidgetProps {
  siteId: string;
}

export function GuestbookWidget({ siteId }: GuestbookWidgetProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [showForm, setShowForm] = useState(false);

  const entries = useQuery(api.guestbook.getEntries, {
    siteId: siteId as Id<"sites">,
  });
  const signGuestbook = useMutation(api.guestbook.sign);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signGuestbook({
        siteId: siteId as Id<"sites">,
        name,
        message,
        email: email || undefined,
        website: website || undefined,
      });
      setName("");
      setMessage("");
      setEmail("");
      setWebsite("");
      setShowForm(false);
      alert("Thanks for signing the guestbook! 🎉");
    } catch (error) {
      alert("Error signing guestbook: " + (error as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-4 border-pink-500 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600">
          <CardTitle className="text-white text-xl">
            📝 Guestbook ({entries?.length || 0} entries)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              ✍️ Sign the Guestbook!
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="gb-name">Your Name *</Label>
                <Input
                  id="gb-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  maxLength={50}
                />
              </div>
              <div>
                <Label htmlFor="gb-message">Message *</Label>
                <textarea
                  id="gb-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message..."
                  required
                  maxLength={500}
                  className="w-full min-h-[100px] p-2 border-2 rounded"
                />
              </div>
              <div>
                <Label htmlFor="gb-email">Email (optional)</Label>
                <Input
                  id="gb-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="gb-website">Website (optional)</Label>
                <Input
                  id="gb-website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yoursite.com"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Sign Guestbook
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {entries && entries.length > 0 && (
        <div className="space-y-3">
          {entries.map((entry) => (
            <Card key={entry._id} className="border-2 border-purple-300">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <strong className="text-purple-600">{entry.name}</strong>
                    {entry.website && (
                      <a
                        href={entry.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-blue-600 hover:underline"
                      >
                        🌐 Visit
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {entry.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
