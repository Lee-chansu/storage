import "./ReviewList.css";

function formDate() {
  const date = new Date();
  return `${date.getFullYear()}.${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item }) {
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1 className="title">{item.title}</h1>
        <p className="rating">{item.rating}</p>
        <p className="createdAt">{formDate(item.createdAt)}</p>
        <p className="content">{item.content}</p>
      </div>
    </div>
  );
}

function ReviewList({ items }) {
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
