import { useTheme } from "@/lib/ThemeContext";
import styles from "@/styles/Setting.module.css";

export default function Setting() {
  const { theme, setTheme } = useTheme();
  //useTheme안에 있는 ThemeContext에서 정의된 theme를 불러옴.

  const handleChange = e => {
    setTheme(e.target.value);
  };

  return (
    <div>
      <h2 className={styles.title}>설정</h2>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>테마 설정</h3>
        <div className={styles.input_wrap}>
          <div className={styles.input}>
            <input
              type="radio"
              name="theme"
              value="light"
              onClick={handleChange}
            />
            light
          </div>
          <div className={styles.input}>
            <input
              type="radio"
              name="theme"
              value="dark"
              onClick={handleChange}
            />
            dark
          </div>
        </div>
      </section>
    </div>
  );
}
