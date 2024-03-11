import Link from "next/link";
import styles from "@/styles/ProductList.module.css";

export default function ProductList({ products = [] }) {
  return (
    <ul className={styles.productList}>
      {products.map(product => {
        return (
          <li key={product.id}>
            <Link className={styles.product} href={`/product/${product.id}`}>
              <img src={product.imgUrl} alt={product.name} width="240px" />
              <span>{product.name}</span>
              <br />
              {product.price}원
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
