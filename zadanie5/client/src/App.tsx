import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Payment } from "./components/Payment";

export default function App() {
  const cart = useCart();

  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <Link to="/">Products</Link>
        <Link to="/cart">Cart ({cart.items.length})</Link>
        <Link to="/payment">Payment</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products onAdd={cart.add} />} />
        <Route path="/cart" element={<Cart items={cart.items} />} />
        <Route path="/payment" element={<Payment items={cart.items} />} />
      </Routes>
    </BrowserRouter>
  );
}
