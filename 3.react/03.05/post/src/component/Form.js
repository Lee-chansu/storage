function Form(props) {
  return(
    <form>
      <div className={props.className}>
        <div className='col'>
          <input type='text' name='title' id='post-title' placeholder='제목' />
        </div>
        <div className='col'>
          <input type='text' name='content' id='post-content' placeholder='내용' />
        </div>
        <div className='col'>
          <button type='submit' id='post-commit' className='btn btn-success'>등록</button>
        </div>
      </div>
    </form>
  )
}
export default Form
