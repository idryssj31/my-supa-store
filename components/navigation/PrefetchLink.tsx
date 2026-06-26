"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type PrefetchLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function PrefetchLink({ href, className, children }: PrefetchLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      onMouseEnter={() => router.prefetch(href)}
    >
      {children}
    </Link>
  );
}
