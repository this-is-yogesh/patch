import React, { createContext, useContext, useReducer } from "react";
import cartReducer, { initialCartState } from "../reducers/cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Reducer pattern for cart management (predictable state transitions)
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const value = { state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
