import "./App.css";
import { Route, Routes } from "react-router-dom";

//컴포넌트
import Nav from "./nav";
import List from "./list";
import Login from "./login";
import Write from "./write";

/*eslint-disable*/

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="list">
          <Route index element={<List />}></Route>
          <Route path="write" element={<Write />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
