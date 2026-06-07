"use client";

import { useStore } from "@/store/useStore";
import { getThemeStyles } from "@/lib/theme";
import { useEffect, useState, useMemo } from "react";

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  const { themeColor, products } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ["Todos", ...Array.from(cats)];
  }, [products]);

  const styles = mounted ? getThemeStyles(themeColor) : getThemeStyles('neutral');

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 sm:px-0 scroll-smooth">
      <div className="flex gap-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 ${styles.ring} ${
              activeCategory === category
                ? `${styles.bg} shadow-md transform scale-105`
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
