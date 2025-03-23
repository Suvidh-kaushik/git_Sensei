import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-zinc-700 text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4">
        Git Sensei: Master Your GitHub Commits
      </h1>
      <p className="text-lg mb-6">
        AI-powered commit summarizer and question answering tool to analyze GitHub commits effortlessly.
      </p>
      <Button className="bg-white text-black hover:bg-gray-300">
        Get Started for Free
      </Button>
    </section>
  );
}
