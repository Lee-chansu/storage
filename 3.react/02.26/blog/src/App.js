import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState } from 'react';

/*eslint-disable*/


function App() {

  // let post = ['부평 일식 맛집', '금일 점메추', '스프링 썸머 코디 추천']

  // [데이터, state 변경을 도와주는 함수]
  let [글제목, 글제목변경] = useState(['짱아는 못말려', '도라에몽','이웃집 토토로'])
  let [좋아요, 좋아요변경] = useState([0, 0, 0])
  let [detail, setDetail] = useState(0) //닫힘 : 0, 열림 : 1

  let arr = [10, 20 , 30]

  let result = arr.map(e => {
    return  e * 100
  })

  return (
    <div className="App">
      <header className="header">
        <div className='container'>
          <h1 className='logo'><a href="#">Blog</a></h1>
          <nav>메뉴</nav>
        </div>
      </header>

      <section className='sec blog'>
        <div className='container'>
          <button onClick={()=>{
                  let copy = [...글제목]
                  copy[0] = '짱구는 못말려'
                  글제목변경(copy)
                }}>수정</button>
          <button onClick={()=>{
            let asc = [...글제목].sort();
            // let likeasc = [...좋아요].sort();
            글제목변경(asc)
            // 좋아요변경(likeasc)
          }}>정렬</button>

          <div className='row list'>

              {
                글제목.map((el,i)=>{
                  return(
                    <div key={i} class='item'>
                      <h3 onClick={()=>{
                        {setDetail(!detail)}}}>{el}
                        <span onClick={()=>{
                          let copy = [...좋아요];
                          copy[i] += 1;
                          좋아요변경(copy)
                        }}>👍</span>{좋아요[i]}
                      
                      </h3>
                    </div>
                  )
                })
              }

          </div>
          <div className='row'>
            <h2>조회</h2>
            {
            /* useState의 detail값이 0이면 - detail x, 있으면 detail - 1 */
              (detail == 1) ? detail = 0 : detail = 1
              
            }
            <Detail></Detail>
          </div>
          
        </div>
      </section>
    </div>
  );
}
function Detail(){
  return(
    <div className='detail'>
      <h3>제목</h3>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}


export default App;
