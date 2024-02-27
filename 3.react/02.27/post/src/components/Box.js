import 'bootstrap/dist/css/bootstrap.min.css'

/*eslint-disabled*/
function Box(props) {
  let {i, post, setPost, setPick} = props;
  return(
    <>
      <div className='col wrap' onClick={()=>{ setPick(i) }}>
        <div className='inner-box d-flex'>
          <p className='col-1'>{post.id}</p>
          <h3 className='col-8'>{post.title}</h3>
          <p className='col-1'>{post.rating}</p>
          <p classNmae='col-2'>{post.createdAt}</p>
        </div>
      </div>
    </>
  )
}

export default Box;