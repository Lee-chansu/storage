import { useRouter } from "next/router";
import SearchForm from "../components/searchForm";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  return (
    <>
      <h1>Search page</h1>
      <SearchForm InitialValue={q} />
      <h2>{q} 검색 결과</h2>
    </>
  );
}
