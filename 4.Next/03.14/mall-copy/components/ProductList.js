import Image from "next/image";
import styles from "@/styles/ProductList.module.css";
import Link from "next/link";

export default function ProductList({ products }) {
  return (
    <ul className={styles.productList}>
      {products.map(product => {
        return (
          <li key={product.id}>
            <Link className={styles.product} href={`/product/${product.id}`}>
              <div className={styles.image}>
                <img src={product.imgUrl} alt={product.name} />
              </div>
              <div className="info">
                <span className={styles.name}>{product.name}</span>
                <br />
                <span className={styles.price}>{product.price}원</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
