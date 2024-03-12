import styles from '@/styles/MovieReviewList.module.css';
import Link from 'next/link'

export default function MovieList({movies}){

  return (
    <ul className={styles.movieReview}>
      {
        movies.map((movie)=>{
          return(
            <li key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <img className={styles.poster} src={movie.posterUrl} alt={movie.title} />
              </Link>
              <div className={styles.info}>
                <h2 className={styles.title}>{movie.title}</h2>
                <div className={styles.date}>
                  {movie.date} / {movie.country}
                </div>
                <div className={styles.starRatingContainer}>
                  <span className={styles.starRating}>{movie.starRating}</span>
                </div>
              </div>
            </li>
          )
        })
      }
    </ul>
  )

}