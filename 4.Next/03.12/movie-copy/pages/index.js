import MovieList from '@/components/MovieList';
import SearchForm from '@/components/SearchForm'
import styles from '@/styles/MovieReviewList.module.css';
import Link from "next/link";
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';


export default function Home() {

  // 데이터 받아서 저장
  const [movies, setMovies] = useState([])

  // 데이터 요청할 함수 작성
  async function getMovies(){
    const res = await axios.get('/movies/')
    const result = res.data.results ?? [] // 왼쪽값이 null, undefined 나오면 오른쪽 값을 반환해라
    setMovies(result)
  }
 
  // 실행했을 때 1번만 
  useEffect(()=>{
    getMovies()
    
  }, [])

  return (
    <>
      <h1>Movie Site</h1>
      <SearchForm/>
      <MovieList className={styles.movieList} movies={movies} />
    </>
  );
}
