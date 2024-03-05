import Post from "./Post.js";
import { getPost } from "../data/api.js";
import { useEffect, useState } from "react";
import { throttle } from "lodash";


// 한번에 불러올 데이터 갯수(상수 - 일반적으로 상수개념 - )

function PostList(props) {
  let { post, setPost, limit, setLimit, offset, setOffSet } = props;
  const [loginUser, setLoginUser] = useState("");
  const [fetching, setFetching] = useState(false);

  //컴포넌트 생성된 시점에서 한 번만 실행

  let handleChange = e => {
    setLimit(e.target.value);
  };

  let handleLoad = async option => {
    
    const { blog, loginUsername } = await getPost(option);
    setLoginUser(loginUser);

    if (option.offset === 0) {
      setPost(blog);
    } else {
      setPost([...post, ...blog]); // 배열에 데이터 붙이기
    }
    setOffSet(option.offset + blog.length);
    
  };

  const handleLoadMore = () => {
    handleLoad({ offset, limit }); // spread 문법, 배열에 데이터 붙이기
  };

  useEffect(() => {
    handleLoad({ offset: 0, limit });
  }, []);

  
  const throttledLoad = throttle(handleLoadMore, 1000)
  window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  
  if (scrollTop + clientHeight === scrollHeight) {
    throttledLoad()
  }
});
  


  return (
    <>
      <select className="limit-select" onChange={handleChange}>
        <option className="limit" value="3">
          3
        </option>
        <option className="limit" value="5">
          5
        </option>
        <option className="limit" value="7">
          7
        </option>
      </select>
      <div className="row row-cols-1">
        {post.map((el, i) => {
          return <Post key={el.id} post={el}></Post>;
        })}
        <button onClick={handleLoadMore}>더보기</button>
      </div>
    </>
  );
}
export default PostList;
