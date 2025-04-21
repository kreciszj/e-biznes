import { Products } from "./components/Products";
import { Payment } from "./components/Payment";
import { useCart } from "./hooks/useCart";

export default function App() {
  const cart = useCart();
  return (
    <div style={{ display: "flex", gap: 32 }}>
      <Products onAdd={cart.add} />
      <Payment items={cart.items} />
    </div>
  );
}
