import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';

//컴포넌트
import Header from './components/header';

//페이지


function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route></Route>
    </Routes>
    </>
  );
}

export default App;
