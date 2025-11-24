"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Currency = 'KES' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  rate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('KES');
  const rate = 129; // Approximate conversion rate

  const toggleCurrency = () => setCurrency(prev => (prev === 'KES' ? 'USD' : 'KES'));

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, rate }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
