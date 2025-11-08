import React, { useEffect, useState, useMemo } from "react";
import BookCard from "../components/BookCard";
import { FixedSizeList as List } from "react-window";

// Home demonstrates: critical rendering path (minimal HTML), lazy loading images, windowing (virtual list), HTTP caching simulation.
export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isAlive = true;
    // Fetch book list (local JSON) — in a real server we would set Cache-Control headers
    fetch("https://openlibrary.org/subjects/fiction.json?limit=500")
      .then(r => r.json())
      .then(data => {
        if (isAlive) {
       // Map API data to our book model
        const mappedBooks = data.works.map((b, index) => ({
          id: b.key + index,
          title: b.title,
          author: b.authors?.map(a => a.name).join(', ') || 'Unknown',
          cover: b.cover_id
            ? `https://covers.openlibrary.org/b/id/${b.cover_id}-L.jpg`
            : 'https://via.placeholder.com/240x260?text=No+Cover',
          price: (Math.random() * 20 + 5).toFixed(2),
        }));
        setBooks(mappedBooks);
        setLoading(false);
        }
      });
    return () => {
      isAlive = false;
    };
  }, []);

  // Memoize row renderer
  const Row = useMemo(
    () =>
      ({ index, style }) => {
        const book = books[index];
        return (
          <div style={style} key={book.id}>
            <BookCard book={book} />
          </div>
        );
      },
    [books]
  );

  if (loading) return <div>Loading books...</div>;

  return (
    <div>
      <h1>Featured Books</h1>
      {/* Windowing: react-window renders only visible rows to keep UI snappy */}
      <List height={600} itemCount={books.length} itemSize={320} width={"100%"}>
        {Row}
      </List>
    </div>
  );
}
