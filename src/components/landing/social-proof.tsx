import React from 'react';

const brands = ['CCI GLOBAL', 'NEXUS BPO', 'TECHPOINT', 'CLOUDFORCE', 'ZENTEL'];

export default function SocialProof() {
  return (
    <section className="border-y border-white/5 bg-white/5 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by next-gen BPOs and Enterprises</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 grayscale opacity-60">
          {brands.map((brand) => (
            <span key={brand} className="text-xl font-bold font-mono text-slate-300">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
