"use client";

import { Product } from "@/data/mockProducts";
import { useStore } from "@/store/useStore";
import { getThemeStyles } from "@/lib/theme";
import PriceDisplay from "./PriceDisplay";
import { useEffect, useState } from "react";

export default function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  const { themeColor } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const styles = mounted ? getThemeStyles(themeColor) : getThemeStyles('neutral');

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-zinc-500 mt-1 mb-2">{product.category}</p>
        <div className="mt-auto pt-3 flex items-end justify-between border-t border-zinc-100 dark:border-zinc-800/50">
          <div className="font-bold text-zinc-900 dark:text-white">
            <PriceDisplay priceUsd={product.price} />
          </div>
          <button className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-transform ${styles.bg} ${styles.hoverBg}`}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
