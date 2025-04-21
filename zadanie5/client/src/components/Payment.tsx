import { useState } from "react";
import { useCart } from "../hooks/CartContext";

export function Payment() {
  const { items, clear } = useCart();
  const [method, setMethod] = useState("card");
  const total = items.reduce((s, i) => s + i.price, 0);

  async function pay() {
    await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: items.map(i => i.id), method }),
    });
    clear();
    alert("Payment sent");
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
