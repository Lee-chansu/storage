import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Routes} from 'react-router-dom'

// 컴포넌트
import Main from './pages/Main.js'
import Join from './pages/Join.js'
import Login from './pages/Login.js'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={ <Main/> } ></Route>
        <Route path="/login" element={ <Login></Login> } ></Route>
        <Route path="/join" element={ <Join/> } ></Route>
      </Routes>
    </>
  )
}


export default App;
