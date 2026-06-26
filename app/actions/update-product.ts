"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProductSchema, type UpdateProductInput } from "@/lib/validations/product";

export type UpdateProductState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Partial<Record<keyof UpdateProductInput, string[]>>;
};

export async function updateProductAction(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { error: "Accès refusé." };
  }

  const parsed = updateProductSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    specs: formData.get("specs"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      error: "Corrigez les champs en erreur.",
      fieldErrors,
    };
  }

  const { slug, name, price, description, specs } = parsed.data;

  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    return { error: "Produit introuvable." };
  }

  await prisma.product.update({
    where: { slug },
    data: { name, price, description, specs },
  });

  return { success: true };
}
