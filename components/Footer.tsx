import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} My Supa Store — Tous droits réservés.
      </p>
    </footer>
  );
}
