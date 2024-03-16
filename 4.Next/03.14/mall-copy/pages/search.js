import { useRouter } from "next/router";
import { getSearchProducts } from "./api/Api";
import { useEffect, useState } from "react";

//컴포넌트
import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  const [proudcts, setProducts] = useState([]);


  const loadProduct = async targetId => {
    const data = await getSearchProducts(targetId);
    setProducts(data);
  };

  useEffect(() => {
    loadProduct(q);
  }, [q]);

  return (
    <>
      <h2>Search Page</h2>
      <SearchForm />
      <ProductList products={proudcts}></ProductList>
    </>
  );
}
