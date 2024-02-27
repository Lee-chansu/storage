import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/*eslint-disable*/

import { useState } from "react";

function App() {
  let [글제목, 글제목변경] = useState(["짱아는 못말려", "도라에몽", "이웃집 토토로"]);
  let [글날짜, 글날짜변경] = useState(['2024-02-06','2024-02-27','2024-03-01'])
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [detail, setDetail] = useState(false); //닫힘 : 0, 열림 : 1

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="logo">
            <a href="#">Blog</a>
          </h1>
          <nav>메뉴</nav>
        </div>
      </header>

      <section className="sec blog">
        <div className="container">
          <button onClick={() => {
              let copy = [...글제목];
              copy[0] = "짱구는 못말려";
              글제목변경(copy);
            }}>수정
          </button>
          <button onClick={() => {
              let asc = [...글제목].sort();
              // let likeasc = [...좋아요].sort();
              글제목변경(asc);
              // 좋아요변경(likeasc)
            }}> 정렬
          </button>

          <div className="row list">
            {
            글제목.map((el, i) => {
              return(
              <div key={i} className="item">
                <h3 onClick={() => {setDetail( i );}}>
                  {el}
                  <span onClick={() => {
                      let copy = [...좋아요];
                      copy[i] += 1;
                      좋아요변경(copy)
                    }}>👍</span>{좋아요[i]}
                </h3>
                <p>{글날짜[i]}</p>
              </div>
            )})
            }
            <div className="row">
              <h2>조회 </h2>
              <Detail title={글제목} date={글날짜} i = {detail}></Detail>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Detail(props) {
  let i = props.i;
  let 글제목 = props.title[i];
  let 글날짜 = props.date[i];
  return (
    <div className="detail">
      <h3>{글제목}</h3>
      <p>{글날짜}</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
