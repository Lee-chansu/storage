import { useRouter } from "next/router";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";

//컴포넌트
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import Head from "next/head";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  const [products, setProducts] = useState([]);
  async function getProducts(query) {
    const res = await axios.get(`/products?q=${query}`);
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts(q);
  }, [q]);

  return (
    <>
      <Head>
        <title>My Mall</title>
        <link href="/favicon.ico"></link>
      </Head>
      <h1>검색페이지!</h1>
      <SearchForm initialValue={q} />
      <h2>{q} 검색결과</h2>
      <ProductList products={products}></ProductList>
    </>
  );
}
