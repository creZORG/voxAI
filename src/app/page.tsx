import Features from "@/components/landing/features";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import Pricing from "@/components/landing/pricing";
import SocialProof from "@/components/landing/social-proof";

export default function Home() {
  return (
    <div className="space-y-32 pb-20">
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
