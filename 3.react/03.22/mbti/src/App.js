import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import New from './New.js';

function App() {
  return (
    <Routes>
      <Route index path='/' element={<Home />}></Route>
      <Route path='/new' element={<New/>}></Route>
    </Routes>
  );
}

export default App;
