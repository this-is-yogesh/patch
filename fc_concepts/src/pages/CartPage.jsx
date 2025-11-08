import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const items = Object.values(state.items);
  if (items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {items.map(it => (
          <li key={it.book.id} style={{ marginBottom: 8 }}>
            <strong>{it.book.title}</strong> x {it.quantity} &nbsp;
            <button
              onClick={() =>
                dispatch({ type: "REMOVE", payload: { id: it.book.id } })
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "CLEAR" })}>Clear Cart</button>
    </div>
  );
}
