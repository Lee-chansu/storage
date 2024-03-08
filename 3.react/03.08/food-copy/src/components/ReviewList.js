import './ReviewList.css'

function ReviewListItem({items}){
    return(
      <>
      <div className="col">
        <p className="title">{items.title}</p>
        <img className="imgUrl" src={items.imgUrl} alt="이미지 미리보기" />
        <p className="rating">{items.rating}</p>
        <p className="content">{items.content}</p>
      </div>
    </>
    )
    
}


function ReviewList({ items }) {
  return (
      {items.map((el) => {
        return (
          <li key={el.id}>
            <ReviewListItem items={el}/>
          </li>
        );
      })}
  );
}

export default ReviewList