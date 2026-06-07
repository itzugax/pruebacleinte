"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/mockProducts";
import { X, MessageCircle } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getThemeStyles } from "@/lib/theme";
import PriceDisplay from "./PriceDisplay";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const sizes = ["S", "M", "L", "XL"];
  
  const { themeColor, exchangeRate, priceDisplayMode } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const styles = mounted ? getThemeStyles(themeColor) : getThemeStyles('neutral');

  const handleWhatsApp = () => {
    let priceText = "";
    if (priceDisplayMode === 'usd') {
      priceText = `$${product.price}`;
    } else if (priceDisplayMode === 'ves') {
      priceText = `${(product.price * exchangeRate).toFixed(2)} Bs`;
    } else {
      priceText = `$${product.price} (${(product.price * exchangeRate).toFixed(2)} Bs)`;
    }
    
    const text = `Hola, me interesa el producto "${product.name}" en talla ${selectedSize}. Precio: ${priceText}`;
    const url = `https://wa.me/584120000000?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-zinc-900/60 backdrop-blur-sm transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl transform transition-all animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="aspect-square w-full relative bg-zinc-100 dark:bg-zinc-900">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-zinc-500 mt-1">{product.category}</p>
            </div>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50 text-right shrink-0">
              <PriceDisplay priceUsd={product.price} />
            </div>
          </div>
          
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-3">
              Selecciona tu talla
            </h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all border-2 ${
                    selectedSize === size
                      ? `${styles.border} ${styles.bgLight}`
                      : "border-transparent bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleWhatsApp}
            className={`mt-8 w-full ${styles.bg} ${styles.hoverBg} py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
          >
            <MessageCircle className="w-6 h-6" />
            Comprar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
