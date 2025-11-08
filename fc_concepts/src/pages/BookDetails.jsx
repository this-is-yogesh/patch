import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Book details is lazy-loaded (bundle splitting). It demonstrates partial re-rendering and lazy data fetch.
export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    let alive = true;
    fetch("https://openlibrary.org/subjects/fiction.json?limit=500")
      .then(r => r.json())
      .then(data => {
        console.log(data,'data*')
        if (!alive) return;
        const found = data.works.find(
          b => String(b.title) === String(id)
        );
        console.log(found,'foundbook')
        setBook(found);
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (!book) return <div>Loading book...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <img
        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
        alt={book.title}
        loading="lazy"
        style={{ maxWidth: 360 }}
      />
      <p>By {"unknown"}</p>
      <p>Price: ${(Math.random() * 20 + 5).toFixed(2)}</p>
      <button onClick={() => dispatch({ type: "ADD", payload: { book } })}>
        Add to cart
      </button>
    </div>
  );
}
