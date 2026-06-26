import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidateTag("products", "max");
  revalidatePath("/");
  revalidatePath("/rendering/cache");

  return NextResponse.json({
    revalidated: true,
    tags: ["products"],
    paths: ["/", "/rendering/cache"],
    at: new Date().toISOString(),
  });
}
