import Dropdown from '@/components/Dropdown';
import { useTheme } from '@/lib/ThemeContext';
import styles from '@/styles/Setting.module.css';

export default function Setting() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h2 className={styles.title}>설정</h2>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>테마 설정</h3>
        <Dropdown
          className={styles.input}
          name="theme"
          value={theme}
          onChange={(name, value) => setTheme(value)}
          options={[
            { label: '라이트', value: 'light' },
            { label: '다크', value: 'dark' },
          ]}
        />
      </section>
    </div>
  );
}
