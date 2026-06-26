import { Suspense, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { CartProvider } from "@/components/cart/CartProvider";
import { getCartItemCount } from "@/lib/cart";

async function CartLayoutInner({ children }: { children: ReactNode }) {
  const itemCount = await getCartItemCount();

  return (
    <CartProvider initialCount={itemCount}>
      <Header />
      <main>{children}</main>
    </CartProvider>
  );
}

export function CartShell({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <CartProvider initialCount={0}>
          <Header />
          <main aria-busy="true" />
        </CartProvider>
      }
    >
      <CartLayoutInner>{children}</CartLayoutInner>
    </Suspense>
  );
}
