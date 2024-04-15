import { Link } from "react-router-dom";
import "./App.css";

function List() {
  return (
    <>
      <section className="sec">
        <div class="white-bg">
          <p>
            새로운 글을 작성해주세요. 👉
            <a href="/add" style="list-style: underline">
              글쓰기
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

export default List;
