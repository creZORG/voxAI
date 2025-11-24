import { Zap, Globe, ShieldCheck, BarChart3, Users, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: string }) => (
  <Card 
    className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border-slate-200 dark:border-slate-800 p-6 hover:border-violet-500/30 transition-colors duration-300 hover:-translate-y-2 transform opacity-0 animate-fade-in-up"
    style={{ animationDelay: delay, animationFillMode: 'forwards' }}
  >
    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{desc}</p>
  </Card>
);

const features = [
  {
    icon: <Zap className="text-amber-500" />,
    title: "Real Actions",
    desc: "Agents call customers, follow up on WhatsApp, update CRMs, track orders, schedule pickups and more."
  },
  {
    icon: <Globe className="text-blue-500" />,
    title: "Instant Knowledge",
    desc: "Upload your manuals, product sheets, policies or website. Your agent becomes an expert in seconds."
  },
  {
    icon: <ShieldCheck className="text-emerald-500" />,
    title: "Perfect for BPOs",
    desc: "Full compliance logs, sentiment scoring, QA metrics and automatic redaction."
  },
  {
    icon: <BarChart3 className="text-rose-500" />,
    title: "Sales Focused Intelligence",
    desc: "Agents qualify leads, pitch products, and push upsells using your own scripts."
  },
  {
    icon: <Users className="text-violet-500" />,
    title: "Customer Service Excellence",
    desc: "Zero wait time. Agents answer instantly, check orders, reschedule deliveries and resolve common issues."
  },
  {
    icon: <Phone className="text-cyan-500" />,
    title: "Marketing Included",
    desc: "Run outbound campaigns, reminders, feedback calls and reactivation workflows."
  }
];

export default function Features() {
  return (
    <section id="product" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Not Just a Chatbot — A Full AI Workforce</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} delay={`${i * 100}ms`} />
        ))}
      </div>
    </section>
  );
}
