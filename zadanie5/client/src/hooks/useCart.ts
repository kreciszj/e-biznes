import { useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  function add(item: CartItem) {
    setItems(prev => [...prev, item]);
  }

  function clear() {
    setItems([]);
  }

  return { items, add, clear };
}
