import { CartItem } from "../hooks/useCart";
import { useState } from "react";

export function Payment({ items }: { items: CartItem[] }) {
  const [method, setMethod] = useState("card");
  const total = items.reduce((sum, i) => sum + i.price, 0);

  function pay() {
    fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: items.map(i => i.id),
        method,
      }),
    }).then(() => alert("Payment sent"));
  }

  return (
    <div>
      <h2>Payment</h2>
      <p>Total: {total} zł</p>
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option value="card">Card</option>
        <option value="cash">Cash</option>
      </select>
      <button disabled={!items.length} onClick={pay}>
        Pay
      </button>
    </div>
  );
}
