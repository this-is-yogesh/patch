import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { state } = useCart();
  const totalItems = Object.values(state.items).reduce(
    (s, i) => s + i.quantity,
    0
  );
  return (
    <header>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="logo">📚 BookVerse</div>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </div>
        <div>
          <Link to="/cart">Cart ({totalItems})</Link>
        </div>
      </div>
    </header>
  );
}
