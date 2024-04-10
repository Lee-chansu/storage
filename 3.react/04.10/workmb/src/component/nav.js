import { Link } from "react-router-dom";

function Nav() {
  return (
    <header class="header">
      <div class="inner">
        <h1>
          <a class="logo">Forum</a>
        </h1>
        <nav class="nav">
          <Link to="/join">Join</Link>
          <Link to="/list">List</Link>
          <Link to="/login">Login</Link>
          <Link to="/add">Write</Link>
          <Link to="/chat/list">Chat</Link>
          <Link to="/loginout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
