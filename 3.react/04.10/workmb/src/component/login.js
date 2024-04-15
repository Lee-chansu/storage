import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <section className="sec">
        <div class="white-bg">
          <form action="/login" method="post">
            <input className="" name="userId" placeholder="userId"/>
            <input className="" name="password" placeholder="password"/>
            <button>전송</button>
            <Link className="link" to="/list">돌아가기</Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
