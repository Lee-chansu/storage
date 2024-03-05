function PostWrite() {
  return(
    <>
      <div className="row row-cols-1">
        <div className="col">
          <input type="text" name="title" id="post-title" placeholder="제목" />
        </div>
        <div className="col">
          <input type="text" name="content" id="post-content" placeholder="내용" />
        </div>
        <div className="col">
          <button type="submit" id="post-commit" className="btn btn-success">등록</button>
          <button type="reset" id="post-cancel" className="btn btn-secondary">취소</button>
        </div>
      </div>
    </>
  )
}
export default PostWrite
