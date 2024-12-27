"use client";

import { createContext, useReducer } from "react";

const reducerAction = () => {
  return (JSON.parse(localStorage.getItem("cart") || "[]") as LocalCart[]).reduce((acc, value) => acc + value.quantity, 0);
}

 const useCartCount = () => {
  const [cartCount, reloadCartCount] = useReducer(reducerAction, 0);

  return {
    cartCount,
    reloadCartCount,
  }
}

export const CartCountContext = createContext<ReturnType<typeof useCartCount> | undefined>(undefined);

export const CartCountProvider = ({ children }: { children: React.ReactNode }) => {
  return <CartCountContext.Provider value={useCartCount()}>{children}</CartCountContext.Provider>;
}