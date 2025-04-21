import { useCart } from "../hooks/CartContext";

export function Cart() {
  const { items } = useCart();
  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {items.length ? (
        <ul>
          {items.map((i, idx) => (
            <li key={idx}>
              {i.name} – {i.price} zł
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <p>Total: {total} zł</p>
    </div>
  );
}
