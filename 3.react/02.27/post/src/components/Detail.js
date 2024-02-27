import 'bootstrap/dist/css/bootstrap.min.css'

/*eslint-disabled*/
function Detail(props){
  let {i, post} = props;
  return(
    <div className='detail'>
      <div className='inner-box'>
        <h3>제목: {post[i].title} </h3>
        <p>상세 : {post[i].content} </p>
        <p>출간일 : {post[i].createdAt}</p>
      </div>
    </div>
  )
}

export default Detail;