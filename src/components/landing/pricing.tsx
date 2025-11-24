"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useCurrency } from '@/contexts/currency-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PricingCard = ({ tier, price, features, currency, popular, rate }: { tier: string, price: number | 'Custom', features: string[], currency: 'KES' | 'USD', popular?: boolean, rate: number }) => {
  const displayPrice = typeof price === 'number' 
    ? currency === 'USD' ? price : Math.round(price * rate / 10) * 10
    : 'Custom';

  return (
    <div className={cn('relative bg-white dark:bg-slate-900 rounded-2xl p-8 border flex flex-col', popular ? 'border-violet-500 shadow-xl shadow-violet-900/20' : 'border-slate-200 dark:border-slate-800')}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Most Popular
        </div>
      )}
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1 mb-6 min-h-[52px]">
        {price !== 'Custom' && (
          <div className="flex items-baseline">
             <span className="text-slate-500 mr-1">{currency}</span>
            <span className="text-4xl font-bold text-slate-900 dark:text-white">
              {typeof displayPrice === 'number' ? displayPrice.toLocaleString() : displayPrice}
            </span>
            <span className="text-slate-500 ml-1">/mo</span>
          </div>
        )}
        {price === 'Custom' && (
           <span className="text-4xl font-bold text-slate-900 dark:text-white">Custom</span>
        )}
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm">
            <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
      <Button asChild className={cn('w-full', popular ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20')}>
        <Link href="/dashboard">
          {price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
        </Link>
      </Button>
    </div>
  );
};


export default function Pricing() {
  const { currency, rate } = useCurrency();

  const pricingTiers = [
    { tier: "Starter", price: 79, features: ['1 AI Agent', 'Customer Service Only', '1,000 Minutes', 'Basic Fulfillment Updates', 'Email Support'], popular: false },
    { tier: "Team", price: 199, features: ['3 AI Agents', 'Customer Service + Sales Agents', '3,000 Minutes', 'Lead follow up', 'WhatsApp + Email automations'], popular: false },
    { tier: "Growth", price: 499, features: ['7 AI Agents', 'Support, Sales + Light Marketing', '10,000 Minutes', 'CRM updates', 'Dynamic scripts', 'Priority Support'], popular: true },
    { tier: "Pro", price: 999, features: ['15 AI Agents', 'Full Marketing AI Suite', 'Outbound Sales Campaigns', 'Retention + Upsell Agents', 'Multilingual voice', 'WhatsApp Priority Support'], popular: false },
    { tier: "Enterprise", price: 'Custom' as const, features: ['Unlimited Agents', 'Full Department AI', 'Volume Discounts', 'Dedicated Success Manager', 'Full Voice Customization', 'SLA Guarantee'], popular: false },
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple. Scalable. Transparent.</h2>
        <p className="text-slate-600 dark:text-slate-400">10-Day Free Trial on all plans. No credit card required to test.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
        {pricingTiers.map(tier => (
          <PricingCard 
            key={tier.tier}
            {...tier}
            currency={currency}
            rate={rate}
          />
        ))}
      </div>
    </section>
  );
}
