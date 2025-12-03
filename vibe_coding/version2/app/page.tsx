import { GeneratorForm } from "@/components/generator/GeneratorForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🌈 90s Website Generator 🌈
          </h1>
          <p className="text-2xl text-white drop-shadow-md">
            ✨ Relive the glory days of GeoCities ✨
          </p>
          <Link
            href="/gallery"
            className="inline-block mt-4 px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition"
          >
            View Gallery 🎨
          </Link>
        </div>

        <GeneratorForm />
      </div>
    </main>
  );
}
