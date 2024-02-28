import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import sample from '../data/sample.json'
import { useState } from 'react';
import Info from './Info'

/*eslint-disabled*/

function App() {

  let [info, setInfo] = useState(sample);

  let [order, setOrder] = useState('id');
  let sortedInfo = info.sort((a,b) => b[order]-a[order])
  
  const ReverseId = () => setOrder('id')
  const ReverseCal = () => setOrder('calorie')
  const ReverseCreated = () => setOrder('createdAt')

  //삭제하는 함수
  const num = 0;
  const onDelete = (num) => {
    const result = info.filter((info) => info.id != num)
    setInfo(result) // useState update 해주기
  };

  return (
    <>
    <header className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='Logo'><a href='#'>Logo</a></h1>
          </div>
          <div className='col nav-wrap'>
            <nav>메뉴</nav>
          </div>
        </div>
      </div>
    </header>

    <section className='sec'>
      <div className='container'>
        <div className='row btn-wrap'>
          <button className='col' onClick={ReverseId}>최신순 정렬</button>
          <button className='col' onClick={ReverseCal}>칼로리 순 정렬</button>
          <button className='col' onClick={ReverseCreated}>게시날짜 순 정렬</button>
        </div>
        <div className='row row-cols-1'>
        <div className='col gird column-gap-2'>
                <ul className='d-flex'>
                  <li className='col-1'>Id</li>
                  <li className='col-2 text-center'><h2>음식 이름</h2></li>
                  <li className='col-2 content'><p>음식 설명</p></li>
                  <li className='col-1 calorie'><p>칼로리</p></li>
                  <li className='col-2'><p className='ps-5 ms-4'>이미지 설명</p></li>
                  <li className='col-2 createdAt'><p>게시 날짜</p></li>
                </ul>
            </div>
          {
            info.map((el)=>{
              return(
                <Info key={el.id} info={el} onDelete={onDelete}></Info>
              )
            })
          }
        </div>
      </div>
    </section>
    </>
  );
}


export default App;
