import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { useEffect, useState } from 'react';
import data from './data/data'
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Header from './component/Header';
import Mental from './component/mental';
import Main from './page/Main';
import About from './page/about';
import Detail from './page/detail';
import Event from './page/event';

/*eslint-dsabled*/

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
  let [isVisible, setisVisible] = useState(true);

  useEffect(()=>{
    let timer = setTimeout(()=>{setisVisible(false)}, 2000)
    return ()=>{clearTimeout(timer)}
  }, [])
  
  return (
    <>
      <Header></Header>
    {
      (isVisible == true) ? <section className='visual'></section> : null
    }
      <Routes>
        <Route path="/" element={<Main shoes={shoes}></Main>}></Route>

        <Route path="/detail/:id" element={<Detail shoes={shoes}></Detail>}></Route>

        <Route path="/mental" element={<Mental></Mental>}></Route>

        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>멤버들 리스트 출력</div>}></Route>
          <Route path="location" element={<div>회사위치</div>}></Route>
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>- 첫 주문시 양배추즙 서비스 -</div>}></Route>
          <Route path="two" element={<div>- 생일기념 쿠폰받기 -</div>}></Route>
        </Route>

        <Route path='*' element={<div>404페이지, 찾는 페이지가 없습니다.</div>}></Route>
      </Routes>

    </>
  );
}
export default App;
