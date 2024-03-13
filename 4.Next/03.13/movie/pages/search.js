import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getSearchMovies } from "./api/Api";
import SearchForm from "@/components/SearchForm";
import MovieList from "@/components/MovieList";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  const [movies, setMovies] = useState([]);
  // url : /search?q=값

  const getData = async q => {
    const data = await getSearchMovies(q);
    setMovies(data);
  };

  useEffect(() => {
    getData(q);
  }, [q]);

  return (
    <>
      <h1>Search page</h1>
      <SearchForm />
      <p>{q}에 대한 결과</p>
      <MovieList movies={movies}/>
    </>
  );
}
