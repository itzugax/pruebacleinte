import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockProducts, Product } from '@/data/mockProducts';

export type ThemeColor = 'neutral' | 'pink' | 'blue';
export type PriceDisplayMode = 'both' | 'usd' | 'ves';

interface StoreState {
  exchangeRate: number;
  priceDisplayMode: PriceDisplayMode;
  themeColor: ThemeColor;
  products: Product[];
  setExchangeRate: (rate: number) => void;
  setPriceDisplayMode: (mode: PriceDisplayMode) => void;
  setThemeColor: (theme: ThemeColor) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      exchangeRate: 40.50,
      priceDisplayMode: 'both',
      themeColor: 'neutral',
      products: mockProducts,
      setExchangeRate: (rate) => set({ exchangeRate: rate }),
      setPriceDisplayMode: (mode) => set({ priceDisplayMode: mode }),
      setThemeColor: (theme) => set({ themeColor: theme }),
      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Date.now().toString() }]
      })),
      updateProduct: (id, updated) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updated } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'ugax-store-settings-v3',
    }
  )
);
