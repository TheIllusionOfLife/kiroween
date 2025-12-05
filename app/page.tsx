import { GeneratorForm } from "@/components/generator/GeneratorForm";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400">
      <Header />
      <div className="max-w-6xl mx-auto px-8 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Create Your Retro Homepage
          </h1>
          <p className="text-2xl text-white drop-shadow-md">
            ✨ Relive the glory days of GeoCities ✨
          </p>
        </div>

        <GeneratorForm />
      </div>
    </main>
  );
}
