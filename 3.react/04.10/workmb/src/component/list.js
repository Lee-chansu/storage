import { Link } from "react-router-dom";

function List() {
  return (
    <>
      <section className="sec">
        <div class="white-bg">
          <Link className="link" to="/list/write">
            <p>새로운 글을 작성해주세요. 👉 글쓰기</p>
          </Link>
        </div>
      </section>
    </>
  );
}

export default List;
