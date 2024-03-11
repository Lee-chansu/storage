// export async function getMovie() {
//   const res = await fetch("https://learn.codeit.kr/api/codeitmall/products/");
//   const movies = await res.json()
//   console.log(movies);
//   return movies;
// }
import axios from "axios";

async function getMovie() {
  const res = await axios.get(
    "https://learn.codeit.kr/api/codeitmall/products/"
  );
  const movies = res.data;
  console.log(movies);
  return movies;
}

getMovie()