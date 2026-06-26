import Link from "next/link";
import { Suspense } from "react";
import {
  PprDynamicSkeleton,
  PprLiveTimestamp,
  PprProductList,
} from "@/components/rendering/PprDynamicSlots";
import styles from "./page.module.css";

const SHELL_BUILT_AT = "2026-06-26T00:00:00.000Z";

export default function PprRenderingPage() {
  return (
    <div>
      <Link href="/" className={styles.back}>
        ← Retour à la boutique
      </Link>
      <h1 className={styles.title}>Partial Prerendering (étape 09)</h1>
      <p className={styles.subtitle}>
        Avec <code>cacheComponents: true</code>, le shell ci-dessous est
        pré-rendu au build. Les blocs en <code>Suspense</code> appellent{" "}
        <code>connection()</code> + Prisma et streament à la requête.
      </p>
      <p className={styles.shellMeta}>
        Shell statique généré au build :{" "}
        <time dateTime={SHELL_BUILT_AT}>{SHELL_BUILT_AT}</time>
      </p>

      <Suspense fallback={<PprDynamicSkeleton />}>
        <PprLiveTimestamp />
      </Suspense>

      <Suspense fallback={<PprDynamicSkeleton />}>
        <PprProductList />
      </Suspense>
    </div>
  );
}
