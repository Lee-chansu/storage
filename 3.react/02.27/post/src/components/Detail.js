import 'bootstrap/dist/css/bootstrap.min.css'

/*eslint-disabled*/
function Detail(props){
  let {i, post} = props;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return(
    <div className='detail'>
      <div className='inner-box'>
        <h3>제목: {post[i].title} </h3>
        <p>상세 : {post[i].content} </p>
        <p>출간일 : {formatDate(post[i].createdAt)}</p>
      </div>
    </div>
  )
}

export default Detail;