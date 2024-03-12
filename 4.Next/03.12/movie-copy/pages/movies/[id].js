import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MovieReviewList from "@/components/MovieReviewList";
import styles from '@/styles/MovieReviewList.module.css'
import axios from "@/lib/axios";

export default function Movie() {
  const [movie, setMovie] = useState('')
  const [movieReviews, setMovieReviews] = useState([])
  const router = useRouter()
  const {id} = router.query  // 파라미터, 쿼리스트링으로 들어온 값을 추출해낼 수 있다.

  //해당 영화 불러오기
  async function loadMovie(targetId){
    const res = await axios.get(`/movies/${targetId}`);
    const nextMovie = res.data
    setMovie(nextMovie)
  }

  // 해당영화에 대한 리뷰 불러오기
  async function loadMovieReviews(targetId) {
    const res = await axios.get(`/movie_reviews/?movie_id=${targetId}`)
    const nextMovieReviews = res.data.results ?? []
    setMovieReviews(nextMovieReviews)
  }


  useEffect(() => {
    if (id) {
      loadMovie(id)
      loadMovieReviews(id)
    }
  }, [id])

 
  if(!movie) return null
  
  return (
    <>
      {console.log(movie)}
      <h1>Movie {id} 페이지</h1>
      <div>
        <div className={styles.header}>
          <img
            className={styles.poster}
            src={movie.posterUrl}
            alt={movie.name}
          />
          <div className={styles.info}>
            <div className={styles.englishTitle}>{movie.englishTitle}</div>
            <h3 className={styles.title}>{movie.title}</h3>
            <table className={styles.infoTable}>
              <tbody>
                <tr><th>개봉</th><td>{movie.date}</td></tr>
                <tr><th>장르</th><td>{movie.genre}</td></tr>
                <tr><th>국가</th><td>{movie.country}</td></tr>
                <tr><th>등급</th><td>{movie.rating}</td></tr>
                <tr><th>러닝타임</th><td>{movie.runningTime}분</td></tr>
                <tr><th>평점</th><td>{movie.starRating}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>소개</h2>
          <p className={styles.description}>{movie.description}</p>
          <span className={styles.readMore}>더보기</span>
        </div>

        <div className={styles.reviewSections}>
          <div>
            <h2 className={styles.sectionTitle}>내 리뷰 작성하기</h2>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>리뷰</h2>
            <MovieReviewList movieReviews={movieReviews} />
          </div>
        </div>

      </div>
    </>
  )
}

