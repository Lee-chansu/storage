import { useState } from "react";
import { useRouter } from "next/router";

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
    <form onSubmit={handleSubmit}>
      <input name="q" value={value} onChange={handleChange} />
      <button>검색</button>
    </form>
  );
}
