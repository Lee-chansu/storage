import "./App.css";
import ReviewForm from "./ReviewForm";
import { getReviews } from "../api";
import { useEffect, useState } from "react";

/*eslint-disabled*/

const Limit = 10;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);

  //정렬기준 바꾸는 함수
  const handleNewestClick = () => setOrder("createdAt"); //최신
  const handleBestClick = () => setOrder("rating"); // 평점

  //데이터 불러오는 함수
  const handleLoad = async option => {
    // limit의 개수만큼 불러오는 데이터는 reviews에 담긴다.
    const { reviews, paging } = await getReviews(option);
    if (option.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]);
      // 기존 데이터에 새로운 데이터 이어붙이기
    }
    //현재까지 불러온 데이터 갯수 = offset 개수
    setOffset(option.offset + option.limit);
  };

  // 프로그램 시작시(컴포넌트 생성될때 처음에 1번만) 데이터 로드
  useEffect(() => {
    handleLoad({ order, offset, limit: Limit });
  }, [order]);

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: Limit });
  };

  return (
    <div className="App">
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <ReviewForm />
      <ReviewList items={items} />
      <button onClick={handleLoadMore}>더 보기</button>
    </div>
  );
}

export default App;
