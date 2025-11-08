import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Home from "./pages/Home";

//Bundle splitting: lazy load book details and cart routes
const BookDetails = lazy(() => import("./pages/BookDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));

export default function App() {
  // return <h1>hi</h1>;
  return (
    <CartProvider>
      <div className="app-shell">
        <Header />
        <main className="main container">
          {/* Suspense shows a fallback while the lazy bundles load */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </CartProvider>
  );
}
