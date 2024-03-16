import { useRouter } from "next/router";
import { useState } from "react";
import styles from '@/styles/SearchForm.module.css'

export default function SearchForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.push(`/search?q=${value}`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className={styles.input} type="text" name="q" value={value} onChange={handleChange} />
      <button className={styles.btn}>전송</button>
    </form>
  );
}
