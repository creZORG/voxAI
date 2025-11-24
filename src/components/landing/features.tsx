import { Zap, Globe, ShieldCheck, Activity, Users, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 p-6 hover:border-violet-500/30 transition-colors duration-300 hover:-translate-y-2 transform">
    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </Card>
);

const features = [
  {
    icon: <Zap className="text-amber-400" />,
    title: "Action Engine",
    desc: "Voxa doesn't just talk. It connects to your APIs to book flights, update CRMs, process refunds, and schedule callbacks autonomously."
  },
  {
    icon: <Globe className="text-blue-400" />,
    title: "Deep Research",
    desc: "Upload your entire knowledge base. Voxa reads manuals, policy documents, and websites in seconds to become an instant expert."
  },
  {
    icon: <ShieldCheck className="text-emerald-400" />,
    title: "BPO Compliance",
    desc: "Automated PII redaction, sentiment analysis logs, and strict script adherence scoring for quality assurance."
  },
  {
    icon: <Activity className="text-rose-400" />,
    title: "Sub-500ms Latency",
    desc: "Conversations feel completely natural. No awkward pauses. Our edge network ensures human-like response times."
  },
  {
    icon: <Users className="text-violet-400" />,
    title: "Multi-Agent Handoff",
    desc: "Tier 1 agents stuck? Voxa seamlessly transfers context and call control to specialist agents or human supervisors."
  },
  {
    icon: <BarChart3 className="text-cyan-400" />,
    title: "Sentiment Velocity",
    desc: "Track how quickly your agents turn frustrated callers into happy customers with real-time mood analytics."
  }
];

export default function Features() {
  return (
    <section id="product" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Heavy Lifting</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Why enterprise leaders choose VOXA over standard chatbots.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} />
        ))}
      </div>
    </section>
  );
}
