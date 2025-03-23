export default function HowItWorks() {
    return (
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-md p-4 h-40">
              <h3 className="text-2xl font-semibold mb-4">Connect GitHub Repo</h3>
              <p>Authenticate your GitHub account to analyze your commits.</p>
            </div>
            <div className="border rounded-md p-4 h-40">
              <h3 className="text-2xl font-semibold mb-4">Analyze Commits</h3>
              <p>Automatically generate commit summaries and insights.</p>
            </div>
            <div className="border rounded-md p-4 h-40">
              <h3 className="text-2xl font-semibold mb-4">Get Answers</h3>
              <p>Ask questions about any commit and receive AI-powered responses.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  