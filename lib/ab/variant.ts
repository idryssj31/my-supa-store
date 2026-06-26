import { cookies } from "next/headers";
import { AB_COOKIE, isAbVariant, type AbVariant } from "@/lib/ab/constants";

export type { AbVariant } from "@/lib/ab/constants";

export async function getAbVariant(): Promise<AbVariant> {
  const cookieStore = await cookies();
  const value = cookieStore.get(AB_COOKIE)?.value;

  if (isAbVariant(value)) {
    return value;
  }

  return "A";
}
