"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartContextValue = {
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
  initialCount: number;
};

export function CartProvider({ children, initialCount }: CartProviderProps) {
  const [itemCount, setItemCount] = useState(initialCount);

  useEffect(() => {
    setItemCount(initialCount);
  }, [initialCount]);

  const value = useMemo(() => ({ itemCount }), [itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
