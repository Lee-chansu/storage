import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
// import { getReviews } from './api';
import data from './data/reviews.json'
import { useEffect, useState } from 'react';

/*eslint-disabled*/

function App() {
  const {reviews} = data;
  const [items, setItems] = useState(reviews);

  // const dataLoad = async() => {
  //   const {reviews} = await getReviews()
  //   setItems(reviews)
  // }
  // useEffect(()=>{
  //   dataLoad()
  // },  []) 
  //콜백함수 뒤의 배열 안에 아무것도 쓰지 않으면 처음 한번만 실행해주고 그 뒤는 실행X 실행시기 조절 가능


  return (
    <>
      <section className='sec'>
        <div className='container container-fluid'>
          <h2 className='title'>NetFlix</h2>
          <ReviewList key={items.id} items={items}></ReviewList>
          {/* <button onClick={dataLoad}>출력하기</button> */}
        </div>
        </section>
    </>
  );
}

function ReviewList(props) {
  let {items} = props;
  return(
    <>
      <div className='row row-cols-3'>
        {
          items.map((el)=>{
            return(
              <ReviewListItem key={el.id} items={el} ></ReviewListItem>
            )
          })
        }
      </div>
    </>
  )
}
function ReviewListItem(props) {
  let {items} = props;
  
  const date = new Date(items.createdAt).toISOString().slice(0,10);
  return(
    <>
      <div className='col item'>
        <div className='inner'>
          <div className='title'><p>{items.title}</p></div>
          <div className='img'><img src={items.imgUrl} alt={items.title} /></div>
          <div className='content'><p>{items.content}</p></div>
          <div className='rating'><p>평점 : {items.rating}</p></div>
          <div className='date'><p>{date}</p></div>
        </div>
      </div>
    </>
  )
}

export default App;
