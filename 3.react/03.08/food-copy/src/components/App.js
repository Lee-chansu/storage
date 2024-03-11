import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

//컴포넌트
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

function App() {
  let [items, setItems] = useState([]);
  let [order, setOrder] = useState("createdAt");
  let [offset, setOffset] = useState(0);
  let [limit, setLimit] = useState(10);

  const handleLoad = async option => {
    const { reviews, page } = await getReviews(option);

    if (option.offset == 0) {
      setItems(reviews);
    } else {
      setItems(prevItems => [...prevItems, ...reviews]);
    }
    setOffset(option.offset + option.limit);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit });
  }, [order]);

  return (
    <div className="App">
      <div className="contianer">
        <div className="row">
          <ReviewForm></ReviewForm>
          <ReviewList items={items} />
        </div>
        <button onClick={handleLoadMore}>더 보기</button>
      </div>
    </div>
  );
}

export default App;
