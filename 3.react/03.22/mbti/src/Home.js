import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//컴포넌트
import ColorSurvey from "./colorSurvey";

//data
import mock from "./mock.json";

function Home() {
  const [data, setData] = useState(mock.results);
  const [filter, setFilter] = useState(null);

  async function handleload(mbti) {
    const res = await axios.get("/color-surveys/", {
      params: { mbti, limit: 20 },
    });
    const nextItems = res.data.results;
    setData(nextItems);
  }

  useEffect(() => {
    handleload(filter);
  }, [filter]);

  return (
    <div>
      <header>
        <h1>MBTI별 좋아하는 컬러</h1>
        {/* {변수 && <태그요소> } */}
        {filter && (
          <div
            onClick={() => {
              setFilter(null);
            }}>
            {filter} <img src="/images/x.svg" alt="필터삭제" />
          </div>
        )}
      </header>

      <div>
        <Link to="/new">+ 새 컬러 등록하기</Link>
      </div>
      <ul>
        {
          /* map 메서드 이용해서 id/ mbti/color */
          data.map(item => {
            return (
              <li key={item.id}>
                <ColorSurvey
                  value={item}
                  onClick={() => {
                    setFilter(item.mbti);
                  }}
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Home;
