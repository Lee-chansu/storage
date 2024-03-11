function formatData(date) {
  //UTC : 세계표준 시각
  // padStart : 2자리 숫자 만들기
  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const YYYY = String(date.getUTCFullYear());

  return `${YYYY}. ${MM}. ${dd}.`;
}

const labels = {
  gender: { male: "남자", female: "여자" },
  fit: { small: "작음", good: "적당함", big: "큼" },
};

function SizeReviewList({ sizeReviews }) {
  return (
    <ul>
      {sizeReviews.map(el => {
        return (
          <li key={el.id}>
            <div>
              <div>{formatData(new Date(el.createdAt))}</div>
              <div>
                ({labels.gender[el.sex]} {el.height}cm 기준)
                {el.size}
              </div>
              <div>{labels.fit[el.fit]}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SizeReviewList;
