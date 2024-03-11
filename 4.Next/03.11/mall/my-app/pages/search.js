import { useRouter } from "next/router";
import axios from "axios";

//컴포넌트
import SearchForm from "@/components/SearchForm";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [product, setProduct] = useState([]);


  async function getProducts(query) {
    const res = await axios.get(`/products/?q=${query}`);
    const nextProducts = res.data.results;
    setProduct(nextProducts);
  }

  useEffect(() => {
    getProducts();
  }, [q]);

  return (
    <>
      <h1>Search 페이지</h1>
      <SearchForm initialValue={q} />
      <h2>{q} 검색결과</h2>
    </>
  );
}
