import { useState } from "react";
import { postPost, getPost } from "../data/api.js";

function PostWrite(props) {
  let {post, setPost, limit, offset } = props;
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let write = async e => {
    e.preventDefault();
    await postPost(title, content);
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    const { blog } = await getPost({offset : 0, limit : post.length});
    setPost(blog);
  };

  return (
    <>
      <form onSubmit={e => write(e)}>
        <div className="row row-cols-1">
          <div className="col">
            <input
              type="text"
              name="title"
              id="post-title"
              placeholder="제목"
              onChange={e => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="content"
              id="post-content"
              placeholder="내용"
              onChange={e => {
                setContent(e.target.value);
              }}
              required
            />
          </div>
          <div className="col">
            <button type="submit" id="post-commit" className="btn btn-success">
              등록
            </button>
            <button type="reset" id="post-cancel" className="btn btn-secondary">
              취소
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default PostWrite;
