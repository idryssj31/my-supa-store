import { NextResponse } from "next/server";
import { addToCart, getCart } from "@/lib/cart";

type CartPostBody = {
  slug?: string;
  name?: string;
};

export async function GET() {
  const cart = await getCart();
  return NextResponse.json({
    itemCount: cart.length,
    items: cart,
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CartPostBody;

  if (!body.slug || !body.name) {
    return NextResponse.json(
      { error: "slug et name sont requis" },
      { status: 400 },
    );
  }

  const cart = await addToCart({ slug: body.slug, name: body.name });

  return NextResponse.json({
    itemCount: cart.length,
    items: cart,
  });
}
