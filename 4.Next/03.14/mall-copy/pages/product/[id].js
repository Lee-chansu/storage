import styles from "@/styles/Product.module.css";
import { getProduct, getReview } from "../api/Api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SizeReivewList from "@/components/SizeReviewList";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [review, setReivew] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const loadProduct = async id => {
    const data = await getProduct(id);
    setProduct(data);
  };

  const loadReview = async id => {
    const data = await getReview(id);
    setReivew(data);
  };

  useEffect(() => {
    if (!id) return;
    loadProduct(id);
    loadReview(id);
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
                  {product.brand}/{product.productCode}
                </td>
              </tr>
              <tr>
                <th>제품명</th>
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
      <SizeReivewList SizeReivew={review} />
    </>
  );
}
