function Item(props) {
 
  let {item, onDelete} = props
  let {id, imgUrl, title, content, createdAt, updatedAt, calorie} = item
  let date = new Date(createdAt).toISOString().substring(0, 10)
  let DeleteClick = ()=> onDelete(id)


  return (
    <>
      <li className='col'>
        <div className="pic">
          <img src={imgUrl}></img>
        </div>
        <div className="info">
          <h3 className="title">{title}</h3>
          <p className="content">{content}</p>
          <p className="calorie">{calorie}</p>
          <p className="data">{date}</p>
          <button onClick={DeleteClick}>삭제</button>
        </div>
      </li>
    </>
  );
}


export default Item;
