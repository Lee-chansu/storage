import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";

//컴포넌트
import SearchForm from "@/components/SearchForm";
import ProductList from "@/components/ProductList";
import { getProducts } from "./api/Api";

export default function Home() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Head>
        <title>My Mall</title>
      </Head>
      <SearchForm />
      <ProductList products={products} />
    </>
  );
}
