import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

//컴포넌트
import ReviewList from "./ReviewList";

function App() {
  let [items, setItems] = useState([]);
  let [order, setOrder] = useState("createdAt");
  let [offset, setOffset] = useState(0);
  let [limit, setLimit] = useState(10);

  const handleLoad = async option => {
    const { review, page } = await getReviews(option);

    if (option.offset == 0) {
      setItems(review);
    } else {
      setItems(prevItems => [...prevItems, review]);
    }
    setOffset(option.offset + option.limit);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit });
  });

  return (
    <div className="App">
      <div>
        <ul>
          <ReviewList items={items} />
        </ul>
      </div>
    </div>
  );
}

export default App;
