"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Get Convex URL from environment variable
// In production (Vercel), this comes from NEXT_PUBLIC_CONVEX_URL
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

// Create Convex client
const convex = new ConvexReactClient(convexUrl);

export function Providers({ children }: { children: ReactNode }) {
  // Show error message if Convex URL is missing
  if (!convexUrl) {
    return (
      <div style={{ padding: '20px', background: '#fee', color: '#c00' }}>
        <h2>Configuration Error</h2>
        <p>Missing NEXT_PUBLIC_CONVEX_URL environment variable.</p>
        <p>Please set it in your Vercel environment variables.</p>
      </div>
    );
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
