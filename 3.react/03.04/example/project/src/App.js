import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Data from './data/bread.json'

//컴포넌트
import Header from './component/header'

//페이지
import Main from './page/Main';


/*eslint-disabled*/

function App() {
  let [bread, setBread] = useState(Data)
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Main bread={bread} />}></Route>

    </Routes>
    </>
  );
}

export default App;
