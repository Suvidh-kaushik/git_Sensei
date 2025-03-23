import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const plans = [
  {
    name: "Free Plan",
    price: "$0/month",
    features: ["10 commits/month", "Basic AI insights", "Email support"],
  },
  {
    name: "Pro Plan",
    price: "$9.99/month",
    features: ["Unlimited commits", "Advanced AI analysis", "Priority support"],
  },
];

export default function Pricing() {
  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="text-sm space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>&#x2713; {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
