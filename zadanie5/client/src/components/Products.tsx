import { useEffect, useState } from "react";
import { CartItem } from "../hooks/useCart";

export function Products({ onAdd }: { onAdd: (p: CartItem) => void }) {
  const [data, setData] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data.map(p => (
          <li key={p.id}>
            {p.name} – {p.price} zł{" "}
            <button onClick={() => onAdd(p)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
