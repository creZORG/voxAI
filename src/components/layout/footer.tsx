import { Mic, Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#demo-section', label: 'Demo' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ],
};

const socialLinks = [
    { href: '#', icon: <Twitter className="w-5 h-5" /> },
    { href: '#', icon: <Github className="w-5 h-5" /> },
    { href: '#', icon: <Linkedin className="w-5 h-5" /> },
]

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-8">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-xl flex items-center justify-center">
                <Mic className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                VOXA
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              The AI Workforce for BPOs, Sales, Customer Service & Fulfillment.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Voxa AI Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors">
                    {link.icon}
                </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}