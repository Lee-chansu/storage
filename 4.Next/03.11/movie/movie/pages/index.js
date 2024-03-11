import Link from "next/link";
import SearchForm from "../components/searchForm";
import Styles from "@/Styles/Home.module.css";
import { getMovieReviews } from "@/pages/api/api";
import { useEffect, useState } from "react";

import MovieReviewList from "@/components/MovieReviewList";

export default function Home() {
  const [movieReviews, setMovieReviews] = useState([]);

  const newMovieReviews = async () => {
    const data = await getMovieReviews();
    setMovieReviews(data);
  };

  useEffect(() => {
    newMovieReviews();
  }, []);

  return (
    <>
      <h1>영화리스트</h1>
      <p>
        <Link href="/settings">설정</Link>
      </p>
      <SearchForm />
      <MovieReviewList movieReviews={movieReviews} />
    </>
  );
}
