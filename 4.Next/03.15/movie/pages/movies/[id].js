import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/MovieReviewList.module.css";

import { getMovie, getMovieReviews } from "../api/Api";
//컴포넌트
import MovieReviewList from "@/components/MovieReviewList";

export default function Movie() {
  const [movie, setMovie] = useState("");
  const [movieReviews, setMovieReviews] = useState([]);

  const router = useRouter();
  const { id } = router.query; //파라미터, 쿼리스트링으로 들어온 값을 추출해낼 수 있다.

  const loadMovie = async targetId => {
    const data = await getMovie(targetId);
    setMovie(data);
  };

  const loadReview = async targetId => {
    const data = await getMovieReviews(targetId);
    setMovieReviews(data);
  };

  useEffect(() => {
    if (id) {
      loadMovie(id);
      loadReview(id);
    }
  }, [id]);

  if (!movie) return null;

  return (
    <>
      <h1>Movie {id}page</h1>
      <div>
        <div className={styles.header}>
          <img className={styles.poster}  src={movie.posterUrl} alt={movie.title}/>
          <div className={styles.info}>
            <div className={styles.englishTitle}>{movie.englishTitle}</div>
            <h3 className={styles.title}>{movie.title}</h3>
            <table className={styles.infoTable}>
              <tbody>
                <tr>
                  <th>개봉</th>
                  <td>{movie.date}</td>
                </tr>
                <tr>
                  <th>장르</th>
                  <td>{movie.genre}</td>
                </tr>
                <tr>
                  <th>국가</th>
                  <td>{movie.country}</td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td>{movie.rating}</td>
                </tr>
                <tr>
                  <th>러닝타임</th>
                  <td>{movie.runningTime}분</td>
                </tr>
                <tr>
                  <th>평점</th>
                  <td>{movie.starRating}</td>
                </tr>
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
  );
}
