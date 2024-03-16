import styles from "@/styles/Header.module.css";
import Link from "next/link";

//컴포넌트
import Container from "./Container";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <Link className={styles.logo} href="/">
          Mall
        </Link>
        <Link className={styles.setting} href="/setting">
          설정
        </Link>
      </Container>
    </header>
  );
}
