/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import data from './data/data'

import {useState} from 'react'
function App() {
// [데이터, state변경을 도와주는 함수]
  let {info} = data;
  let [items, setItems] = useState(info);
  let [detail, setDeatail] = useState(false) // 디테일창 보이냐?
  let [postNum, setPostNum] = useState(0) // 몇번째 디테일?

  return (
    <div className="App">
      <header className='header'>
        <div className='container'>
          <h1 className='logo'><a href="#">Blog</a></h1>
        </div>
      </header>
      <section className='sec blog'>
        <div className='container'>
          <div className='btn-wrap'>
            <button onClick={()=>{
              let copy=[...items]
              copy[0].title = '짱구는 못말려'
              setItems(copy)
            }}>수정</button>
            <button onClick={()=>{
              let copy = [...items] // 복제
              let copyTitle = copy.title;
              copyTitle.sort(copyTitle)
              setItems(copy) // state 변경
            }}>정렬</button>
          </div>
          <div className='row list'>
              {
                items.map((el, i)=>{
                  return (
                    <div key={el.id} className='item' onClick={()=>{setDeatail(true);}}>
                      <h3 onClick={()=>{ setPostNum(i); }}>{el.title}             
                        <span onClick={ ()=>{
                          let copy = [...items]
                          copy[i].good += 1
                          setItems(copy)
                        } }>👍</span> {el.good} </h3>
                        <p>{el.data}</p>
                    </div>
                  )
                })
              }
          </div>
          <div className='row'>
            <h2>조회</h2>
            {
              (detail == true) 
              ? <Detail i={postNum} items={items[postNum]}></Detail> 
              : null
            }
          </div>
        </div>
      </section>
    </div>
  );
}

function Detail(props){

  let {items} = props

  return (
    <div className="detail">
      <h3>{items.title}</h3>
      <p>{items.data}</p>
    </div>
  )
}


export default App;
