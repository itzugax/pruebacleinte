"use client";

import { useState, useEffect } from 'react';
import { useStore } from "@/store/useStore";

export default function PriceDisplay({ 
  priceUsd, 
  className = "", 
  horizontal = false 
}: { 
  priceUsd: number, 
  className?: string,
  horizontal?: boolean
}) {
  const { exchangeRate, priceDisplayMode } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className={className}>...</div>;

  const priceVes = priceUsd * exchangeRate;
  const formatVes = (amount: number) => new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(amount);
  const formatUsd = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  if (priceDisplayMode === 'usd') return <div className={className}>{formatUsd(priceUsd)}</div>;
  if (priceDisplayMode === 'ves') return <div className={className}>{formatVes(priceVes)}</div>;
  
  return (
    <div className={`flex ${horizontal ? 'gap-2 items-center' : 'flex-col'} ${className}`}>
      <span>{formatUsd(priceUsd)}</span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">{formatVes(priceVes)}</span>
    </div>
  );
}
