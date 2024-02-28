
function Info(props){
  let {info, onDelete} = props;
  let date = new Date(info.createdAt).toISOString().substring(0,10);
  let DelCheck = () => onDelete(info.id)

  return(
  <div className='col grid column-gap-2'>
    <ul className='d-flex '>
      <li className='col-1'>{info.id}</li>
      <li className='col-2 text-center'><p className='title'>{info.title}</p></li>
      <li className='col-2 content'><p>{info.content}</p></li>
      <li className='col-1 calorie'><p>{info.calorie}</p></li>
      <li className='col-2'><img src={info.imgUrl} alt={info.title}/></li>
      <li className='col-2 createdAt'><p>{date}</p></li>
      <button onClick={DelCheck}>삭제</button>
    </ul>
  </div>
    
  )
}

export default Info;