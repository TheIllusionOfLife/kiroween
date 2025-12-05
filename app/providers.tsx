"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // Get Convex URL from environment variable at runtime
  // This ensures it's available in the browser, not during build
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  // Create Convex client using useMemo to avoid recreating on every render
  const convex = useMemo(() => {
    if (!convexUrl) {
      console.error("Missing NEXT_PUBLIC_CONVEX_URL environment variable");
      return null;
    }
    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  // Show error message if Convex URL is missing
  if (!convex) {
    return (
      <div style={{ padding: '20px', background: '#fee', color: '#c00', margin: '20px' }}>
        <h2>⚠️ Configuration Error</h2>
        <p><strong>Missing NEXT_PUBLIC_CONVEX_URL environment variable.</strong></p>
        <p>Please check your Vercel environment variables and redeploy.</p>
        <details style={{ marginTop: '10px' }}>
          <summary>Troubleshooting Steps</summary>
          <ol>
            <li>Go to Vercel Dashboard → Settings → Environment Variables</li>
            <li>Verify NEXT_PUBLIC_CONVEX_URL is set for Production</li>
            <li>Click &ldquo;Redeploy&rdquo; to rebuild with the environment variable</li>
          </ol>
        </details>
      </div>
    );
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
