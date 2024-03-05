import Header from "../component/Header"
import Sec from "../component/Sec"
import PostWrite from "../component/PostWrite.js"
import PostList from "../component/PostList.js"
import { useState } from "react";



function Main() {
  const [post, setPost] = useState([]); //데이터 담아 놓는 state 변수
  const [limit, setLimit] = useState(3);
  const [offset, setOffSet] = useState(0);
  return(
    <>
      <Header/>
      <Sec title={'✍ Memo Write!'} area={'blog-post'}>
        <PostWrite post={post} setPost={setPost} limit={limit} offset={offset} />
      </Sec>
      <Sec title={'📜 Memo List!'} area={'blog-list'} >
      
        <PostList post={post} setPost={setPost} limit={limit} setLimit={setLimit} offset={offset} setOffSet={setOffSet}/>
      </Sec>
    </>
  )
}
export default Main
