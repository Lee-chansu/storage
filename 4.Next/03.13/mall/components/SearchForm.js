import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/SearchForm.module.css"

export default function SearchForm({initialValue = ''}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search?q=${value}`)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} name="q" value={value} onChange={handleChange} />
      <button className={styles.btn}>검색</button>
    </form>
  );
}
