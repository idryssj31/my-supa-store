import styles from "./template.module.css";

export default function ProductsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.template}>{children}</div>;
}
