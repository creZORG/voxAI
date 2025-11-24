"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center max-w-7xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white dark:to-slate-500">
        The AI Workforce for BPOs, Sales, <br />Customer Service & Fulfillment
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
        Instantly deploy voice and chat agents that close sales, handle support, run marketing campaigns and update your systems in real time.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild className="w-full sm:w-auto text-lg px-8 py-4 h-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-transform duration-300">
          <Link href="/dashboard">Start Free 10-Day Trial</Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 h-auto gap-2 bg-transparent hover:scale-105 transition-transform duration-300">
          <Link href="#">Book Live Demo</Link>
        </Button>
      </div>
    </section>
  );
}
