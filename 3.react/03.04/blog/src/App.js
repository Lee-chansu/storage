import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Route, Routes, Link} from 'react-router-dom'
import Data from './data/data.json'
import { useState } from 'react';

// 컴포넌트, 페이지
import Header from './component/header';
import Main from './page/Main-login'
import MainLogin from './page/Main'
import Login from './page/Login'
import Join from './page/Join'

function App() {
  let {blog, setBlog} = Data;
  let [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header key={blog.id} blog={blog} isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
        {
        (isLogin) ? <Route path='/:id' element={<MainLogin  setIsLogin={setIsLogin} blog={blog} setBlog={setBlog}/>}></Route>
          : <Route path='/' element={<Main setIsLogin={setIsLogin} blog={blog} setBlog={setBlog}/>}></Route>
        
        }
        <Route path='/login' element={<Login setIsLogin={setIsLogin} blog={blog} setBlog={setBlog}/>}></Route>
        <Route path='/join' element={<Join setIsLogin={setIsLogin} blog={blog} setBlog={setBlog}/>}></Route>
      </Routes>
    
    </>
  );
}

export default App;
