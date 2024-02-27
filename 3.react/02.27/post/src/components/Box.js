import 'bootstrap/dist/css/bootstrap.min.css'

/*eslint-disabled*/
function Box(props) {
  let {i, post, setPost, setPick} = props;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return(
    <>
      <div className='col wrap' onClick={()=>{ setPick(i) }}>
        <div className='inner-box d-flex'>
          <p className='col-1'>{post.id}</p>
          <h3 className='col-8'>{post.title}</h3>
          <p className='col-1'>{post.rating}</p>
          <p classNmae='col-2'>{formatDate(post.createdAt)}</p>
        </div>
      </div>
    </>
  )
}

export default Box;