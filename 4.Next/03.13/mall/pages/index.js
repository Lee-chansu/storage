import SearchForm from "@/components/SearchForm";
import styles from "@/styles/Home.module.css";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

//컴포넌트
import ProductList from "@/components/ProductList";
import Head from "next/head";

export default function Home() {
  const [products, setProduct] = useState([]);

  async function getProducts() {
    const res = await axios.get("/products");
    const nextProducts = res.data.results;
    setProduct(nextProducts);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Head>
        <title>My Mall</title>
        <link href="/favicon.ico"></link>
      </Head>
      <SearchForm />
      <ProductList products={products}></ProductList>
    </>
  );
}
