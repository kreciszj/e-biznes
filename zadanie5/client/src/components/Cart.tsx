import { CartItem } from "../hooks/useCart";

export function Cart({ items }: { items: CartItem[] }) {
  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((i, idx) => (
            <li key={idx}>
              {i.name} – {i.price} zł
            </li>
          ))}
        </ul>
      )}
      <p>Total: {total} zł</p>
    </div>
  );
}
