"use client";

import { useStore } from "@/store/useStore";
import { getThemeStyles } from "@/lib/theme";
import { useEffect, useState } from "react";
import { RefreshCw, Clock } from "lucide-react";

export default function Header() {
  const { themeColor, exchangeRate, setExchangeRate } = useStore();
  const [mounted, setMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    
    // Auto-sync BCV
    const syncBCV = async () => {
      try {
        const res = await fetch('/api/bcv');
        const data = await res.json();
        if (data && data.tasa > 0) {
          setExchangeRate(data.tasa);
          if (data.actualizado) {
            const date = new Date(data.actualizado);
            setLastUpdate(date.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }));
          }
        }
      } catch (error) {
        console.error("Error fetching BCV rate:", error);
      }
    };
    
    syncBCV(); // Sincroniza al entrar
    const interval = setInterval(syncBCV, 10 * 60 * 1000); // Sincroniza cada 10 min
    
    return () => clearInterval(interval);
  }, [setExchangeRate]);

  const styles = mounted ? getThemeStyles(themeColor) : getThemeStyles('neutral');

  return (
    <>
      {mounted && (
        <div className="w-full bg-zinc-950 dark:bg-zinc-100 text-zinc-400 dark:text-zinc-500 py-2 px-4 flex justify-center items-center gap-3 text-[11px] sm:text-xs font-medium tracking-wide">
          <span className="flex items-center gap-1.5 text-white dark:text-zinc-900">
            <RefreshCw className="w-3 h-3" />
            Tasa BCV: {exchangeRate.toFixed(2)} Bs
          </span>
          {lastUpdate && (
            <>
              <span className="opacity-30">|</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Actualizado: {lastUpdate}
              </span>
            </>
          )}
        </div>
      )}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="California Logo" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
                California
              </h1>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${styles.textHighlight}`}>
                Surf & Skate Shop
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
