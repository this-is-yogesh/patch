import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function BookCard({ book }) {
  const { dispatch } = useCart();
  if (!book) return null;
  return (
    <div className="book-card">
      {/* Lazy loading image and reserved size to avoid layout shifts (CLS) */}
      <img
        className="book-cover"
        src={book.cover}
        alt={book.title}
        loading="lazy"
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => dispatch({ type: "ADD", payload: { book } })}>
          Add to cart
        </button>
        <Link to={`/book/${book.title}`}>Details</Link>
      </div>
    </div>
  );
}
