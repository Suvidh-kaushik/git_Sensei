import { Button } from "./ui/button";

export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-black to-zinc-700 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">
        Ready to Analyze Your Commits?
      </h2>
      <p className="mb-6">Start using Git Sensei today and improve your code quality.</p>
      <Button className="bg-white text-blue-500 hover:bg-gray-100">
        Get Started Now
      </Button>
    </section>
  );
}
