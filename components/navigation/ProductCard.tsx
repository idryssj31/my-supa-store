"use client";

import Link from "next/link";
import type { AbVariant } from "@/lib/ab/variant";
import { PrefetchLink } from "@/components/navigation/PrefetchLink";

type ProductCardProps = {
  href: string;
  className?: string;
  variant: AbVariant;
  children: React.ReactNode;
};

export function ProductCard({
  href,
  className,
  variant,
  children,
}: ProductCardProps) {
  if (variant === "B") {
    return (
      <PrefetchLink href={href} className={className}>
        {children}
      </PrefetchLink>
    );
  }

  return (
    <Link href={href} prefetch={undefined} className={className}>
      {children}
    </Link>
  );
}
