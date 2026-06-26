import { NextResponse } from "next/server";
import { getProducts } from "@/lib/queries/products";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    products: products.map((product) => ({
      slug: product.slug,
      name: product.name,
      price: product.price,
    })),
  });
}
