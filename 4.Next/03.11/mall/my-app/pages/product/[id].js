import { useRouter, navigator } from "next/router";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import SizeReviewList from "@/components/SizeReviewList";

export default function Product() {
  const [sizeReviews, setSizeReviews] = useState([]);
  const [product, setProduct] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // async function getProducts(targetId) {
  //   const baseUrl = "https://learn.codeit.kr/api/codeitmall";
  //   const res = await fetch(`${baseUrl}/products/${targetId}`);
  //   const nextProducts = await res.json();
  //   setProduct(nextProducts);
  // }
  async function getProducts(targetId) {
    const res = await axios.get(`/products/${targetId}`);
    const nextProducts = res.data;
    setProduct(nextProducts);
  }
  async function getSizeReviews(targetId) {
    const res = await axios.get(`/size_reviews?product_id=${targetId}`);
    const nextSizeReviews = res.data.results ?? []; // ?? 왼쪽의 결과가 null, undefined면 오른쪽 결과를
    console.log(nextSizeReviews);
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;
    getProducts(id);
    getSizeReviews(id);
  }, [id]);

  if (!product) return null;

  return (
    <>
      <h1>{product.name} 페이지</h1>
      <img src={product.imgUrl} alt={product.name} />
      <SizeReviewList sizeReviews={sizeReviews}></SizeReviewList>
    </>
  );
}
