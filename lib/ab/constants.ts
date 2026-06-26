export type AbVariant = "A" | "B";

export const AB_COOKIE = "ab_variant";

export const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const AB_COOKIE_OPTIONS = {
  httpOnly: false,
  sameSite: "lax" as const,
  path: "/",
  maxAge: AB_COOKIE_MAX_AGE,
};

export function isAbVariant(value: string | null | undefined): value is AbVariant {
  return value === "A" || value === "B";
}
