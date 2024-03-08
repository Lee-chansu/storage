import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import LocaleSelect from "./localSelect";
import localeContext from "../context/LocaleContext";
import { createReview, getReviews, updateReview, deleteReview } from "../api";
import "./App.css";

const LIMIT = 10;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0); // 데이터를 불러올때 건너뛸 갯수
  const [items, setItems] = useState([]);
  const [locale, setLocale] = useState("ko");

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

  // 더보기 버튼을 누르면 활성화
  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT }); //기존의 offset + limit 된 만큼 보여줌.
  };

  /*
    async + await : 가 붙은 이유
    비동기함수(fetch)가 호출됐기 때문
  */

  //데이터가 새로추가된 후 기존 items에 새로 추가하는 코드
  const handleCreateSuccess = review => {
    //review : 새로 추가된 데이터
    setItems(prevItems => [review, ...prevItems]);
    // 새로추가된 데이터를 맨 앞으로 추가하고 기존의 데이터를 붙이는 방식.
  };

  //업데이트 성공 후 업데이트한 자료 기존의 items에 붙이기
  const handleUpdateSuccess = review => {
    //review : 업데이트 된 데이터
    setItems(prevItems => {
      //수정할 데이터와 일치하는지 검사
      const splitIdx = prevItems.findIndex(item => item.id == review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleDelete = async id => {
    //실제로 db에 저장된 데이터 중 id와 같은 것을 삭제하도록 fetch요청을 한다.
    const result = await deleteReview(id);
    if (!result) return;

    //삭제한 id에 해당하는 데이터만 제외하고 - 새로운 목록이 만들어진다.
    //아래의 코드가 없을 경우 삭제된 데이터를 찾기 위해 렌더링하다가 오류를 내게 된다.
    const nextItems = items.filter(item => item.id != id);
    // id와 다른것만 true, true의 목록이 별도로 생성.
    setItems(nextItems);
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]); // 정렬 조건 바뀔때마다, 데이터 다시 가져오기

  return (
    <localeContext.Provider value={locale}>
      <div className="App">
        <LocaleSelect value={locale} setLocale={setLocale} />
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
    </localeContext.Provider>
  );
}

export default App;
