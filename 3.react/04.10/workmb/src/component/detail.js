import { Link } from "react-router-dom";

function Detail() {
  return (
    <>
      <section className="sec">
        <div class="white-bg">
          <Link className="link" to="/chat">
            <p>채팅하러 가기</p>
          </Link>
          <h2>제목 : </h2>
          <p>내용 : </p>
          
        </div>
      </section>
    </>
  );
}

export default Detail;
