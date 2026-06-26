"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  updateProductSchema,
  type UpdateProductInput,
} from "@/lib/validations/product";

export type UpdateProductState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof UpdateProductInput, string[]>>;
};

export async function updateProductAction(
  _prevState: UpdateProductState,
  formData: FormData,
): Promise<UpdateProductState> {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Accès refusé." };
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
      success: false,
      error: "Corrigez les champs en erreur.",
      fieldErrors,
    };
  }

  const { slug, name, price, description, specs } = parsed.data;

  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    return { success: false, error: "Produit introuvable." };
  }

  if (formData.get("forceError") === "1") {
    return {
      success: false,
      error:
        "Erreur simulée : la mise à jour a été annulée (aucune donnée modifiée).",
    };
  }

  try {
    await prisma.product.update({
      where: { slug },
      data: { name, price, description, specs },
    });
  } catch {
    return {
      success: false,
      error: "Impossible d'enregistrer le produit. Réessayez plus tard.",
    };
  }

  revalidateTag("products", "max");
  revalidatePath("/");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/admin");

  redirect(`/admin?updated=${slug}`);
}
