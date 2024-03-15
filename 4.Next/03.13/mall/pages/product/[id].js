import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import styles from "@/styles/Product.module.css";

//컴포넌트
import SizeReviewList from "@/components/SizeReviewList";

export default function Product() {
  const [sizeReviews, setSizeReviews] = useState([]);
  const [product, setProduct] = useState([]);
  const router = useRouter();
  const { id } = router.query;

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
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>제품정보</h3>
        <div className={styles.info}>
          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <th>브랜드/품번</th>
                <td>
                  {product.brand} / {product.productCode}
                </td>
              </tr>
              <tr>
                <th>제품명</th>
                <td>{product.name}</td>
              </tr>
              <tr>
                <th>가격</th>
                <td>
                  <span className={styles.salePrice}>{product.price}원</span>{" "}
                  {product.salePrice}원
                </td>
              </tr>
              <tr>
                <th>포인트 적립</th>
                <td>{product.point}</td>
              </tr>
              <tr>
                <th>구매 후기</th>
                <td className={styles.starRating}>{product.starRatingCount}</td>
              </tr>
              <tr>
                <th>좋아요</th>
                <td className={styles.like}>♥{product.likeCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <SizeReviewList sizeReviews={sizeReviews}></SizeReviewList>
    </>
  );
}
