import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code, CheckCircle, FileText } from "lucide-react";

const features = [
  {
    title: "AI-Powered Insights",
    icon: <Code size={32} />,
    description: "Analyze and summarize commit diffs using AI models.",
  },
  {
    title: "Custom Queries",
    icon: <FileText size={32} />,
    description: "Ask questions about any commit and get detailed answers.",
  },
  {
    title: "Seamless Integration",
    icon: <CheckCircle size={32} />,
    description: "Easily integrate with your GitHub repositories.",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Git Sensei?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md hover:bg-zinc-100 cursor-pointer">
              <CardHeader className="flex items-center justify-center">
                {feature.icon}
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold">
                  {feature.title}
                </CardTitle>
                <p className="text-sm mt-2">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
