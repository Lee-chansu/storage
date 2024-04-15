import { Link } from "react-router-dom";

function Join() {
  return (
    <>
      <section className="sec">
        <div class="white-bg">
          <form action="/join" method="post">
            <input className="" name="userId" placeholder="userId"/>
            <input className="" name="password" placeholder="password"/>
            <button>회원가입</button>
            <Link className="link" to="/login">돌아가기</Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Join;
