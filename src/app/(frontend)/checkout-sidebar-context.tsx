"use client"

import { createContext, useState } from "react";

const useCheckoutSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen
  }
};

export const CheckoutSidebarContext = createContext<ReturnType<typeof useCheckoutSidebar> | undefined>(undefined);

export const CheckoutSidebarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CheckoutSidebarContext.Provider value={useCheckoutSidebar()}>
      {children}
    </CheckoutSidebarContext.Provider>
  );
};