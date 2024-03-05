import Header from "../component/Header"
import Sec from "../component/Sec"
import PostWrite from "../component/PostWrite.js"
import PostList from "../component/PostList.js"


function Main() {
  return(
    <>
      <Header/>
      <Sec title={'✍ Memo Write!'} area={'blog-post'}>
        <PostWrite/>
      </Sec>
      <Sec title={'📜 Memo List!'} area={'blog-list'}>
        <PostList/>
      </Sec>
    </>
  )
}
export default Main
