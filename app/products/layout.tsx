import styles from "./layout.module.css";

type ProductsLayoutProps = {
  children: React.ReactNode;
  similar: React.ReactNode;
  sponsored: React.ReactNode;
};

export default function ProductsLayout({
  children,
  similar,
  sponsored,
}: ProductsLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.sponsoredSlot}>{sponsored}</div>
      <div className={styles.mainSlot}>{children}</div>
      <div className={styles.similarSlot}>{similar}</div>
    </div>
  );
}
