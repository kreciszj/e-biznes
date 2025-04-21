import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartCtx {
  items: CartItem[];
  add: (i: CartItem) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  function add(i: CartItem) {
    setItems(prev => [...prev, i]);
  }
  function clear() {
    setItems([]);
  }
  return <Ctx.Provider value={{ items, add, clear }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
