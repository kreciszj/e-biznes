import { useEffect, useState } from "react";
import { useCart, CartItem } from "../hooks/CartContext";

export function Products() {
  const [data, setData] = useState<CartItem[]>([]);
  const { add } = useCart();

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setData);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data.map(p => (
          <li key={p.id}>
            {p.name} – {p.price} zł{" "}
            <button onClick={() => add(p)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
