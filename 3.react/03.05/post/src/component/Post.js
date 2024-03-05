import { useEffect, useState } from 'react'
import EditBtn from './EditBtn.js'

function Post(props) {
  
  const {post, loginUserName} = props
  const postUserName = post.User.username

  const [editable, setEditable] = useState('')
  const [readonly, setReadonly] = useState('readonly')
  const [inputTitle, setInputTitle] = useState('')
  const [inputContent, setInputContent] = useState('')

  const handleTitleChange = (e)=>{
    console.log(e)
  }
  const handleContentChange = (e)=>{
    console.log(e)
  }

  useEffect(()=>{
    console.log(readonly)
  },[readonly])



  return(
    <>
      <div className={`col item ${editable}`}>
        <div className='user-info d-flex justify-content-between'>
          <div className='name'>
            <i className='bi bi-person-fill'></i>
            <span id='login-user'>{postUserName}님</span>
          </div>
          { 
            (loginUserName == postUserName) && 
            <EditBtn 
              editable={editable} setEditable={setEditable}
              readonly={readonly} setReadonly={setReadonly}
            /> 
          }
        </div>
        <div className='row m-0 p-0 user-post'>
          <div className='d-flex align-items-center'>
            <label htmlFor='blogTitle' className='col-2'>제목</label>
            <div>{post.id}</div>
            <input 
              type='text' name='title' className='blog-title' 
              readOnly={readonly} 
              value={post.title}
              onChange={(e) => handleTitleChange(e)}
            />
          </div>
          <div className='d-flex align-items-center'>
            <label htmlFor='blogContent' className='col-2'>내용</label>
            <input 
              type='text' name='Content' className='blog-content' 
              readOnly={readonly}
              value={post.content}
              onChange={(e) => handleContentChange(e)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Post
