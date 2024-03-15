import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/ProductList.module.css";

export default function ProductList({ products = [] }) {
  return (
    <ul className={styles.productList}>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link className={styles.product} href={`/product/${product.id}`}>
              <div className={styles.image}>
              <Image src={product.imgUrl} alt={product.name} fill
               />
               </div>
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
