"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import Footer from "@/components/Footer";
import { Product } from "@/data/mockProducts";
import { useStore } from "@/store/useStore";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { products } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  if (!mounted) return <div className="min-h-screen bg-white dark:bg-zinc-950"></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 pt-6 pb-12">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Catálogo</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Encuentra tu estilo perfecto con nuestra nueva colección.
          </p>
        </div>
        
        <div className="-mx-4 sm:mx-0 mb-6 border-b border-zinc-100 dark:border-zinc-800/50 pb-2">
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 dark:text-zinc-400">
              No hay productos en esta categoría por ahora.
            </p>
          </div>
        )}
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
