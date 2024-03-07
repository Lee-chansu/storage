import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { createReview, getReviews, updateReview, deleteReview } from "../api";
import "./App.css";

const LIMIT = 10;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0); // 데이터를 불러올때 건너뛸 갯수
  const [items, setItems] = useState([]);

  // 정렬기준 바꾸는 함수
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  // 데이터 불러오는 함수
  const handleLoad = async option => {
    const { reviews, paging } = await getReviews(option);
    if (option.offset === 0) {
      setItems(reviews);
    } else {
      setItems(prevItems => [...prevItems, ...reviews]); // 기존데이터에 새로운 데이터 이어붙이기
    }
    // 기존 offset + 새로 불러온 데이터 갯수 = offset 교체
    setOffset(option.offset + option.limit);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = review => {
    setItems(prevItems => [review, ...prevItems]);
    console.log(items);
  };

  const handleUpdateSuccess = review => {
    setItems(prevItems => {
      const splitIdx = prevItems.findIndex(item => item.id == review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleDelete = async id => {
    const result = await deleteReview(id);
    if (!result) return;

    const nextItems = items.filter((item)=>item.id != id)
    setItems(nextItems);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]); // 정렬 조건 바뀔때마다, 데이터 다시 가져오기

  return (
    <div className="App">
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <ReviewForm
        onSubmit={createReview}
        onSubmitSuccess={handleCreateSuccess}
      />
      <ReviewList
        items={items}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
        onDelete={handleDelete}
      />
      <button onClick={handleLoadMore}>더 보기</button>
    </div>
  );
}

export default App;
