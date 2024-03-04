import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Data from './data/data.json'

//컴포넌트
import Header from './component/header'
import Main from './page/Main';


//페이지

/*eslint-disabled*/

function App() {
  let [bread, setBread] = useState(Data)
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Main />}></Route>
    
    </Routes>
    </>
  );
}

export default App;
