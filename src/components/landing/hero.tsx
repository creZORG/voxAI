"use client";

import { Play, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const handleDemoScroll = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center max-w-7xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8 animate-fade-in-up">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
        </span>
        Now supporting GPT-4o Voice & Custom Actions
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
        The AI That Doesn&apos;t Just Talk. <br />
        <span className="text-violet-500">It Acts.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Deploy autonomous voice agents that research topics in real-time, master your knowledge base, and execute complex workflows. Perfect for BPOs, Customer Care, and Sales.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild className="w-full sm:w-auto text-lg px-8 py-4 h-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-transform duration-300">
          <Link href="/dashboard">Start Free 10-Day Trial</Link>
        </Button>
        <Button variant="secondary" onClick={handleDemoScroll} className="w-full sm:w-auto text-lg px-8 py-4 h-auto gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-transform duration-300">
          <Play className="w-4 h-4" /> Live Interactive Demo
        </Button>
      </div>

      <div className="mt-20 relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-2xl overflow-hidden aspect-video group">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
        <div className="p-8 h-full flex flex-col items-center justify-center space-y-6">
           <div className="w-24 h-24 rounded-full bg-violet-500/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-2 border-violet-500/50 animate-ping-slow" />
              <div style={{animationDelay: '0s'}} className="w-3 h-12 bg-violet-500 rounded-full animate-pulse-bar mx-1" />
              <div style={{animationDelay: '0.2s'}} className="w-3 h-16 bg-violet-500 rounded-full animate-pulse-bar mx-1" />
              <div style={{animationDelay: '0.4s'}} className="w-3 h-8 bg-violet-500 rounded-full animate-pulse-bar mx-1" />
           </div>
           <div className="space-y-2 text-center z-20">
             <div className="text-2xl font-mono text-white">&quot;Checking the CRM for user 8492...&quot;</div>
             <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono text-sm">
               <Check className="w-4 h-4" /> Action Executed: Update_Subscription_Plan
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
