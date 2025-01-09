"use client";

import { createContext, useReducer } from "react";

type CartStateType = {
  cartCount: number;
  cartData: LocalCart[];
}

const reducerAction = (): CartStateType => {
  const data = JSON.parse(localStorage.getItem("cart") || "[]") as LocalCart[];
  return {
    cartCount: data.reduce((acc, value) => acc + value.quantity, 0),
    cartData: data,
  };
}

 const useCart = () => {
  const [cart, reloadCart] = useReducer(reducerAction, {cartCount: 0, cartData: []});

  return {
    cart,
    reloadCart,
  }
}

export const CartContext = createContext<ReturnType<typeof useCart> | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return <CartContext.Provider value={useCart()}>{children}</CartContext.Provider>;
}