import { getMovieReviews } from "@/pages/api/api";

function formatdata(date) {
  const YYYY = String(date.getUTCFullYear());
  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
}

export default function MovieReviewList(movieReviews) {
  return (
    <ul>
      {/* {movieReviews.map(el => {
        return (
          <li key={el.id}>
            <img src={el.imgUrl} alt={el.title} />
            <div>{formatdata(new Date(el.createdAt))}</div>
            <p>{el.title}</p>
          </li>
        );
      })} */}
    </ul>
  );
}
