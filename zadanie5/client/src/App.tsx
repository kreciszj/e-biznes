import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider, useCart } from "./hooks/CartContext";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Payment } from "./components/Payment";

function Menu() {
  const { items } = useCart();
  return (
    <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
      <Link to="/">Products</Link>
      <Link to="/cart">Cart ({items.length})</Link>
      <Link to="/payment">Payment</Link>
    </nav>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
