import React from 'react';

const brands = ['LUNA BPO', 'AFRICALL', 'HYPERCONNECT', 'SUPERSERV', 'KAZI CLOUD', 'NEXUS OPS'];

export default function SocialProof() {
  return (
    <section className="border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-8">Trusted by Modern BPOs and Enterprise Teams</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 grayscale opacity-60 dark:opacity-40">
          {brands.map((brand) => (
            <span key={brand} className="text-xl font-bold font-mono text-slate-500 dark:text-slate-300">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
