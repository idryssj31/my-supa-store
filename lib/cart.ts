import { cookies } from "next/headers";

const CART_COOKIE = "cart";

export type CartItem = {
  slug: string;
  name: string;
};

export async function getCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE)?.value;

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getCartItemCount(): Promise<number> {
  const cart = await getCart();
  return cart.length;
}

export async function addToCart(item: CartItem): Promise<CartItem[]> {
  const cart = await getCart();
  const nextCart = [...cart, item];
  const cookieStore = await cookies();

  cookieStore.set(CART_COOKIE, JSON.stringify(nextCart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return nextCart;
}
