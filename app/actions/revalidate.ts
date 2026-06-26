"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateProductsCache() {
  revalidateTag("products", "max");
  revalidatePath("/");
  revalidatePath("/rendering/cache");
}
