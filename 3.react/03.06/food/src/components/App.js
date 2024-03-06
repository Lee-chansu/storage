import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { getReviews } from "../api";
import { useEffect, useState } from "react";

//컴포넌트
import ReviewList from "./ReviewList";

function App() {
  const [items, setItems] = useState([]);
  
  //데이터 불러오는 함수
  const handleLoad = async ()=>{
    const {reviews} = await getReviews()
    setItems()
  }

  useEffect(()=>{
    handleLoad()
  },[])

  return (
    <div className="App">
      <ReviewList itmes={data} />
    </div>
  );
}

export default App;
