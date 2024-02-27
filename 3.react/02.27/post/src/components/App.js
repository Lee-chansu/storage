import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import Box from './Box'
import Detail from './Detail';
import { useState } from 'react';
import item from '../data/mock.json'

/*eslint-disabled*/

function App() {
  // 내가 필요한 코드 작성
  //state 변수 : 변화가 자주 일어나는 데이터가 있을 때 사용하면 좋다.

    let [post, setPost] = useState(item)
    let [pick, setPick] = useState(0)
    let [inputTitle, setInputTitle] = useState('')
    let [inputDate, setInputDate] = useState('')

    const [order, setOrder] = useState('id');
    const sortedItems = item.sort((a, b)=>a[order]-b[order]); 
    //order에 저장된 기준으로 내림차순 정렬.

    const handleNewestClick = ()=> setOrder('createdAt')
    const handleBestClick = () => setOrder('rating')

  return(
    <>
      <header className='header'>
        <div className='container'>
          <h1 className='Logo'><a href="#">Logo</a></h1>
          <div className='row'>
            <div className='nav'>
              <nav>메뉴</nav>
            </div>
          </div>
        </div>
      </header>
      <section className='sec'>
        <div className='container'>
          <h2 className='title text-center'>New Post!</h2>
          <div className='row'>
            <div className='col'>
              <label>제목: </label>
              <input type="text" className='inputTitle' onChange={ (e)=>{
                setInputTitle(e.target.value)
              } } />
              <label>날짜: </label>
              <input type="date" className='inputDate' onChange={ (e)=>{
                setInputDate(e.target.value)
              } } />
              <button onClick={()=>{
                if(inputTitle != '' && inputDate != ''){
                  //post 배열에 객체를 추가
                  // let newPost={title : inputTitle, date : inputDate, like : 0}
                  // setPost([...post, newPost])
                  // 마지막에 값추가 - push / 처음에 값추가 : unshift()
                  setInputTitle('');
                  setInputDate('');
                }
                }}>확인</button>
              
            </div>
          </div>
          <div className='row btn-wrap'>
            <button className='col btn' onClick={handleNewestClick}>최신순</button>
            <button className='col btn' onClick={handleBestClick}>베스트순</button>
          </div>
          <div className='row row-cols-1'>
            <div className='col wrap'>
              <div className='inner-box d-flex'>
                <p className='col-1'>아이디</p>
                <h3 className='col-8'>제목</h3>
                <p className='col-1'>No</p>
                <p classNmae='col-2'>창작일</p>
              </div>
            </div>
            {
              //배열.map(() => {}) : 배열의 개수만큼 데이터를 가공해서 새로운 배열을 만들어줌.
              post.map((el, i) => {
                return(
                <Box key={i} i={i} post={post[i]} setPost={setPost} setPick={setPick}></Box>
                )
              })
            }
          </div>
          <div className='row row-detail'>
            <Detail i={pick} post={post}></Detail>
          </div>
        </div>
      </section>
    </>
  )

}

export default App;