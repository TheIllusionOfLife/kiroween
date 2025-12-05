"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md mb-8">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700">
          🌈 90s Website Generator
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/gallery" 
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Gallery 🎨
          </Link>
          
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.imageUrl && (
                  <img 
                    src={user.imageUrl} 
                    alt={user.username || "User"} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-gray-700 font-medium">
                  {user.username || user.firstName || "User"}
                </span>
              </div>
              <SignOutButton>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
                Sign In
              </button>
            </SignInButton>
          )}
        </nav>
      </div>
    </header>
  );
}
