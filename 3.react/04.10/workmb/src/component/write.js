import { Link } from "react-router-dom";

function Write() {
  return (
    <>
      <section className="sec">
        <div class="white-bg">
          <form action="/write" method="post">
            <input className="" name="title" placeholder="title"/>
            <input className="" name="content" placeholder="content"/>
            <button>전송</button>
            <Link className="link" to="/list">돌아가기</Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Write;
