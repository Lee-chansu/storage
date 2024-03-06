import "./ReviewList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem(props) {
  const { item } = props;

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button>삭제</button>
      </div>
    </div>
  );
}

function ReviewList(props) {
  const { items } = props;
  return (
    <ul>
      {items.map(el => {
        return (
          <li key={el.id}>
            <ReviewListItem item={el} />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
