
import { useState } from 'react';
import '../App.css';
import data from '../data/sample.json'
import Item from './Item'


function App() {
  let [items, setItems] = useState(data)
  let [order, setOrder] = useState('createdAt')

  // 원본은 보관, 바뀐 데이터만 별도로 저장해서 활용한다.
  const sortedItems = [...items].sort((a,b)=> b[order] - a[order] )
  
  const handleNewestClick = ()=> setOrder('createdAt')
  const handleCalorieClick = ()=> setOrder('calorie')

  // 삭제하는 기능
  const deleteItem = (id)=>{
    const result = items.filter((item)=> item.id != id )// 삭제 후 리스트
    setItems(result) // state 변경
  }
    

  return (
    <>
      <section className='sec'>
        <div className='container-lg'>
          <h2 className='title'>New Post!</h2>
          <div className='row sort-btn'>
            <button onClick={handleNewestClick}>최신순</button>
            <button onClick={handleCalorieClick}>칼로리순</button>
          </div>
          <ul className='row'>
            {
              sortedItems.map((el)=>{
                return(
                  <Item key={el.id} item={el} onDelete={deleteItem} ></Item>
                )
              })
            }
          </ul>
        </div>
      </section>
    </>
  );
}


export default App;
