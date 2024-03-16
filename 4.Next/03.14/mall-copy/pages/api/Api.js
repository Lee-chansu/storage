import axios from "@/lib/axios";

export async function getProducts() {
  const res = await axios.get("/products");
  const productsData = res.data.results ?? [];
  return productsData;
}

export async function getSearchProducts(target) {
  const res = await axios.get(`/products?q=${target}`);
  const productsData = res.data.results ?? [];
  return productsData;
}

export async function getProduct(targetId) {
  const res = await axios.get(`/products/${targetId}`);
  const productData = res.data;
  return productData;
}

export async function getReview(targetId) {
  const res = await axios.get(`/size_reviews?product_id=${targetId}`);
  const reviewsData = res.data.results ?? [];
  return reviewsData;
}
