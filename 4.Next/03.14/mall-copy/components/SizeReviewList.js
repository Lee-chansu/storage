function formData(date) {
  const YYYY = String(date.getUTCFullYear());
  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");

  return `${YYYY}. ${MM}. ${dd}.`;
}

const labes = {
  gender: { male: "남자", female: "여자" },
  fit: { small: "작다", good: "적당하다", big: "크다" },
};

export default function SizeReivewList({ SizeReivew = [] }) {
  return (
    <ul>
      {SizeReivew.map(review => {
        <li key={review.id}>
          <div>
            <div>{formData(new Date(review.createdAt))}</div>
            <div>
              ({labes.gender[review.sex]} {review.height}cm기준)
              {review.size}
            </div>
            <div>{labes.fit[review.fit]}</div>
          </div>
        </li>;
      })}
    </ul>
  );
}
