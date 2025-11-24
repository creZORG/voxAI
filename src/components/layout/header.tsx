"use client";

import React, { useState } from 'react';
import { Mic, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/contexts/currency-context';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currency, toggleCurrency } = useCurrency();

  return (
    <header className="fixed w-full z-50 border-b border-slate-200/50 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-xl flex items-center justify-center">
              <Mic className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              VOXA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#product" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Product</Link>
            <Link href="/#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
            <div className="h-6 w-px bg-slate-300 dark:bg-white/10" />
            <button 
              onClick={toggleCurrency}
              className="text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 px-3 py-1 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {currency}
            </button>
            <Button variant="ghost" className="!px-4 !py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5" asChild>
              <Link href="/dashboard">Log In</Link>
            </Button>
            <Button className="!px-4 !py-2 text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900 dark:text-white p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 p-4 space-y-4">
          <Link href="/#product" onClick={() => setIsMenuOpen(false)} className="block w-full text-left text-slate-600 dark:text-slate-300 py-2">Product</Link>
          <Link href="/#pricing" onClick={() => setIsMenuOpen(false)} className="block w-full text-left text-slate-600 dark:text-slate-300 py-2">Pricing</Link>
          <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600" asChild>
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Launch Console</Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
