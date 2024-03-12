import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import SearchForm from "@/components/SearchForm";
import MovieList from "@/components/MovieList";

export default function Search() {

  const router = useRouter()
  const q = router.query['q']
  const [movies, setMovies] = useState([])

  async function getMovies(title){
    const res = await axios.get(`/movies?q=${title}`)
    const result = res.data.results ?? [] // 왼쪽값이 null, undefined 나오면 오른쪽 값을 반환해라
    setMovies(result)
  }

  useEffect(()=>{
    getMovies(q)
  }, [q])

  return (
    <>
      <SearchForm initialValue={q}/>
      <h1>Search 페이지</h1>
      <p>{q}에 대한 결과</p>
      <MovieList movies={movies}/>
    </>
  );
}

