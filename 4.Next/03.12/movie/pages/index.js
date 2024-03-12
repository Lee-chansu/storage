import styles from "@/styles/Movie.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

//컴포넌트
import SearchForm from "@/components/SearchForm";
import { getMovies } from "./api/Api";
import MovieList from "@/components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const getData = async () => {
    const data = await getMovies();
    console.log(data);
    setMovies(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className={styles.center}>Movie Site</h1>
      <SearchForm />
        <MovieList className={styles.movieList} movies={movies}></MovieList>
    </>
  );
}
