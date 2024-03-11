import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchForm({ InitialValue = "" }) {
  const router = useRouter();
  const [value, setValue] = useState(InitialValue);
  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.push(`/search?q=${value}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="q" value={value} onChange={handleChange} />
        <button>검색</button>
      </form>
    </>
  );
}
