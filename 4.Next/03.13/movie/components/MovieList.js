import styles from '@/styles/Movie.module.css'
import Link from 'next/link';

export default function MovieList({ movies }) {
  return (
    <ul className={styles.header}>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link className={styles.link} href={`/movies/${movie.id}`}>
                <div >
                    <img className={styles.poster} src={movie.posterUrl} alt={movie.title} />
                    <div className={styles.info}>
                        <h2 className={styles.title}>{movie.title}</h2>
                        <div className={styles.date}>
                            {movie.date} / {movie.country}
                        </div>
                        <div className={styles.starRatingContainer}>
                            <span className={styles.starRating}>{movie.starRating}</span>
                        </div>
                    </div>
                </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
