import styles from "@/styles/MovieReviewList.module.css";
import formatedDate from "@/lib/fromatedDate";

const labels = {
  gender: { male: "남성", female: "여성" },
};

function MovieReview({ movieReview }) {
  return (
    <>
      <li className={styles.movieReview}>
        <div className={styles.date}>{formatedDate(movieReview.createdAt)}</div>
        <div>{labels.gender[movieReview.sex]}</div>
        <div className={styles.age}>{movieReview.age}대</div>
        <span>{movieReview.starRating}</span>
      </li>
    </>
  );
}

export default function MovieReviewList({ movieReviews }) {
  if (!movieReviews || movieReviews.length === 0) {
    return <div className={styles.empty}>아직 작성된 리뷰가 없습니다.</div>;
  }

  return (
    <ul className={styles.MovieReviewList}>
      {movieReviews.map(movieReview => (
        <MovieReview key={movieReview.id} movieReview={movieReview} />
      ))}
    </ul>
  );
}
