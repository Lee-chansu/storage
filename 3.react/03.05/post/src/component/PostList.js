import Post from './Post.js'
import { useEffect, useState } from 'react'

function PostList() {
  
  const [post, setPost] = useState([])
  const [loginUserName, setLoginUserName] = useState('')

  return(
    <>
      <div className="row row-cols-1">
        {
          post.map((el, i)=>{
            return(
              <Post key={el.id} post={el} loginUserName={loginUserName}></Post>
            )
          })
        }
      </div>
    </>
  )
}
export default PostList
