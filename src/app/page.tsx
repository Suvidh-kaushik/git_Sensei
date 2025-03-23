import Hero from "../components/Hero.jsx"
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Pricing from "../components/Pricing.jsx";
import CTA from "../components/CTA.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-900">
      <Hero/>
      <Features />
      {/* <HowItWorks /> */}
      {/* <Pricing /> */}
      {/* <CTA /> */}
      <Footer/>
    </main>
  );
}
