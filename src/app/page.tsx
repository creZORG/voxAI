import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import InteractiveDemo from "@/components/landing/interactive-demo";
import Pricing from "@/components/landing/pricing";
import SocialProof from "@/components/landing/social-proof";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      <Hero />
      <SocialProof />
      <Features />
      <section id="demo-section" className="max-w-6xl mx-auto px-4">
        <InteractiveDemo />
      </section>
      <Pricing />
      <Footer />
    </div>
  );
}
