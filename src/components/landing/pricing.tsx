"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useCurrency } from '@/contexts/currency-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PricingCard = ({ tier, price, features, currency, popular, rate }: { tier: string, price: number | 'Custom', features: string[], currency: 'KES' | 'USD', popular?: boolean, rate: number }) => {
  const displayPrice = typeof price === 'number' 
    ? currency === 'USD' ? price : Math.round(price * rate)
    : 'Custom';

  return (
    <div className={cn('relative bg-slate-900 rounded-2xl p-8 border flex flex-col', popular ? 'border-violet-500 shadow-xl shadow-violet-900/20' : 'border-slate-800')}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Most Popular
        </div>
      )}
      <h3 className="text-lg font-medium text-white mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1 mb-6 min-h-[52px]">
        {price !== 'Custom' && (
          <>
            <span className="text-4xl font-bold text-white">
              {currency === 'KES' ? 'KES ' : '$'}{typeof displayPrice === 'number' ? displayPrice.toLocaleString() : displayPrice}
            </span>
            <span className="text-slate-500">/mo</span>
          </>
        )}
        {price === 'Custom' && (
           <span className="text-4xl font-bold text-white">Custom</span>
        )}
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
            <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
      <Button asChild className={cn('w-full', popular ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20')}>
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
    {
      tier: "Starter",
      price: 99,
      features: ['1 Agent', '1,000 Minutes/mo', 'Basic Knowledge Base', 'Email Support'],
      popular: false,
    },
    {
      tier: "Growth",
      price: 299,
      features: ['5 Agents', '5,000 Minutes/mo', 'API Action Engine', 'Sentiment Analytics', 'Priority Support'],
      popular: true,
    },
    {
      tier: "Enterprise",
      price: 'Custom' as const,
      features: ['Unlimited Agents', 'Volume Discounts', 'On-prem Deployment', 'SLA Guarantees', 'Dedicated Success Manager'],
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Scalable Pricing</h2>
        <p className="text-slate-400">10-Day Free Trial on all plans. No credit card required to test.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
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
