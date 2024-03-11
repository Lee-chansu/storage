import SearchForm from "@/components/SearchForm";
import styles from "@/styles/Home.module.css";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

//컴포넌트
import ProductList from "@/components/ProductList";

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
      <h1 className={styles.flower}>Korea Mall</h1>
      <SearchForm />
      <ProductList products={products}></ProductList>
    </>
  );
}
