import { Dropdown } from "@/components/Dropdown";
import { useTheme } from "@/lib/ThemeContext";
import styles from "@/styles/Setting.module.css";

export default function Setting() {
  const { theme, setTheme } = useTheme();
  //useTheme안에 있는 ThemeContext에서 정의된 theme를 불러옴.

  const handleChange = () => {
    setTheme();
  };

  return (
    <div>
      <h2 className={styles.title}>설정</h2>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>테마 설정</h3>
        <input type="radio" name="theme" value="light" onClick={() => {}} />
        light
        <input type="radio" name="theme" value="dark" onClick={() => {}} />
        dark
      </section>
    </div>
  );
}
