import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getSimilarProducts(slug: string): Promise<Product[]> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      similarTo: true,
      similarFrom: true,
    },
  });

  if (!product) {
    return [];
  }

  const similar = new Map<number, Product>();

  if (product.similarTo) {
    similar.set(product.similarTo.id, product.similarTo);
  }

  for (const related of product.similarFrom) {
    similar.set(related.id, related);
  }

  return Array.from(similar.values());
}
