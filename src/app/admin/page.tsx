"use client";

import { useStore, PriceDisplayMode, ThemeColor } from "@/store/useStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Edit2, X, Search, RefreshCw } from "lucide-react";
import { getThemeStyles } from "@/lib/theme";
import { Product } from "@/data/mockProducts";

export default function AdminPage() {
  const store = useStore();
  const [mounted, setMounted] = useState(false);
  
  const [rateInput, setRateInput] = useState("");
  const [isSyncingBCV, setIsSyncingBCV] = useState(false);

  // Product form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: 0,
    image: "",
    description: ""
  });

  useEffect(() => {
    setMounted(true);
    setRateInput(store.exchangeRate.toString());
  }, [store.exchangeRate]);

  if (!mounted) return null;

  const handleSaveRate = () => {
    const parsed = parseFloat(rateInput);
    if (!isNaN(parsed) && parsed > 0) {
      store.setExchangeRate(parsed);
      alert("Tasa actualizada correctamente");
    }
  };

  const handleSyncBCV = async () => {
    try {
      setIsSyncingBCV(true);
      const res = await fetch("/api/bcv");
      const data = await res.json();
      if (data && data.tasa > 0) {
        setRateInput(data.tasa.toString());
        alert(`Tasa BCV sincronizada exitosamente: ${data.tasa} Bs (Fuente: ${data.fuente})`);
      } else {
        alert("No se pudo obtener la tasa del BCV en este momento.");
      }
    } catch (err) {
      alert("Error de conexión al sincronizar la tasa.");
    } finally {
      setIsSyncingBCV(false);
    }
  };

  const handleEditProduct = (p: Product) => {
    setIsEditing(true);
    setEditingId(p.id);
    setProductForm({
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      description: p.description
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      store.deleteProduct(id);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      store.updateProduct(editingId, productForm);
    } else {
      store.addProduct(productForm);
    }
    setIsEditing(false);
    setEditingId(null);
    setProductForm({ name: "", category: "", price: 0, image: "", description: "" });
  };

  const styles = getThemeStyles(store.themeColor);

  const filteredProducts = store.products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la tienda
        </Link>
        
        <h1 className="text-3xl font-black tracking-tight mb-8">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            {/* Tasa de Cambio */}
            <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Tasa de Cambio</h2>
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                    Precio del Dólar en Bolívares (VES)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">Bs.</span>
                    <input
                      type="number"
                      step="0.01"
                      value={rateInput}
                      onChange={(e) => setRateInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleSyncBCV}
                    disabled={isSyncingBCV}
                    className="flex-1 px-4 py-3 rounded-xl font-bold flex justify-center items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncingBCV ? 'animate-spin' : ''}`} />
                    BCV
                  </button>
                  <button 
                    onClick={handleSaveRate}
                    className={`flex-1 px-4 py-3 rounded-xl font-bold flex justify-center items-center gap-2 ${styles.bg} ${styles.hoverBg} transition-all`}
                  >
                    <Save className="w-4 h-4" />
                    Guardar
                  </button>
                </div>
              </div>
            </section>

            {/* Modo de Visualización */}
            <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Visualización de Precios</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'both', label: 'Ambas (USD y VES)' },
                  { id: 'usd', label: 'Solo Dólares' },
                  { id: 'ves', label: 'Solo Bolívares' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => store.setPriceDisplayMode(mode.id as PriceDisplayMode)}
                    className={`p-3 rounded-xl border-2 text-xs sm:text-sm font-semibold transition-all ${
                      store.priceDisplayMode === mode.id
                        ? `${styles.border} ${styles.bgLight}`
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Tema de Colores */}
            <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Tema de la Tienda</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'neutral', label: 'Neutral', colorClass: 'bg-zinc-900' },
                  { id: 'pink', label: 'Rosado', colorClass: 'bg-pink-600' },
                  { id: 'blue', label: 'Azul', colorClass: 'bg-blue-600' },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => store.setThemeColor(theme.id as ThemeColor)}
                    className={`p-3 rounded-xl border-2 flex items-center justify-between text-sm font-semibold transition-all ${
                      store.themeColor === theme.id
                        ? "border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-950"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {theme.label}
                    <div className={`w-5 h-5 rounded-full ${theme.colorClass}`}></div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Gestión de Productos */}
            <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 h-[700px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Productos</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm ${styles.bg} ${styles.hoverBg} transition-all`}
                  >
                    <Plus className="w-4 h-4" />
                    Nuevo
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProduct} className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-y-auto no-scrollbar">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">{editingId ? "Editar Producto" : "Nuevo Producto"}</h3>
                    <button type="button" onClick={() => { setIsEditing(false); setEditingId(null); }} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Nombre</label>
                      <input required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Categoría</label>
                        <input required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm" placeholder="Ej. Franelas" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Precio (USD)</label>
                        <input type="number" required step="0.01" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: parseFloat(e.target.value)})} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">URL de la Imagen</label>
                      <input required type="url" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm" placeholder="https://..." />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">Descripción</label>
                      <textarea required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm h-24 resize-none" />
                    </div>
                  </div>
                  
                  <button type="submit" className={`mt-4 w-full py-3 rounded-lg font-bold ${styles.bg} ${styles.hoverBg} transition-colors`}>
                    {editingId ? "Guardar Cambios" : "Agregar Producto"}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col flex-1 min-h-0">
                  <div className="relative mb-4 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar producto..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    />
                  </div>
                  <div className="space-y-3 overflow-y-auto pr-2 flex-1 no-scrollbar min-h-0">
                    {filteredProducts.length === 0 ? (
                      <p className="text-zinc-500 text-sm text-center py-8">No se encontraron productos.</p>
                    ) : (
                      filteredProducts.map(p => (
                        <div key={p.id} className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate text-zinc-900 dark:text-zinc-50">{p.name}</p>
                            <p className="text-xs text-zinc-500">${p.price} • {p.category}</p>
                          </div>
                          <div className="flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0">
                            <button onClick={() => handleEditProduct(p)} className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
