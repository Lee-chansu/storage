import { Link } from "react-router-dom";

function Nav() {
  return (
    <header class="header">
      <div class="inner">
        <h1>
          <a class="logo">Forum</a>
        </h1>
        <nav class="nav">
          <Link className="link" to="/join">Join</Link>
          <Link className="link" to="/list">List</Link>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/list/write">Write</Link>
          <Link className="link" to="/chat/list">Chat</Link>
          <Link className="link" to="/loginout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
