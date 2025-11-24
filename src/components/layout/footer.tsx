import { Mic } from 'lucide-react';
import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-lg flex items-center justify-center">
            <Mic className="text-white w-4 h-4" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">VOXA</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Voxa AI Systems. Built for the future of work.</p>
      </div>
    </footer>
  );
}
