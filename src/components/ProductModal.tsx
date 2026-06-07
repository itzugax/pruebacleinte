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
  const { themeColor, exchangeRate, priceDisplayMode } = useStore();
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const hasSizes = (product.availableSizes && product.availableSizes.length > 0) || 
                   (product.outOfStockSizes && product.outOfStockSizes.length > 0);

  useEffect(() => {
    setMounted(true);
    if (product.availableSizes && product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0]);
    }
  }, [product]);

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
    
    let text = `Hola, me interesa el producto "${product.name}"`;
    if (hasSizes) {
      text += ` en talla ${selectedSize}`;
    }
    text += `. Precio: ${priceText}`;
    
    const url = `https://wa.me/584120856945?text=${encodeURIComponent(text)}`;
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
          
          {hasSizes && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-3">
                Selecciona tu talla
              </h3>
              <div className="flex flex-wrap gap-3">
                {/* Tallas Disponibles */}
                {product.availableSizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 min-w-[3rem] h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all border-2 ${
                      selectedSize === size
                        ? `${styles.border} ${styles.bgLight}`
                        : "border-transparent bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
                {/* Tallas Agotadas */}
                {product.outOfStockSizes?.map((size) => (
                  <button
                    key={`out-${size}`}
                    disabled
                    className="flex-1 min-w-[3rem] h-12 rounded-xl flex items-center justify-center text-sm font-semibold border-2 border-transparent bg-zinc-50 dark:bg-zinc-900/50 text-zinc-400 dark:text-zinc-600 cursor-not-allowed line-through opacity-60"
                    title="Agotado"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={handleWhatsApp}
            disabled={hasSizes && !selectedSize}
            className={`mt-8 w-full ${styles.bg} ${styles.hoverBg} py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:hover:scale-100`}
          >
            <MessageCircle className="w-6 h-6" />
            Comprar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
