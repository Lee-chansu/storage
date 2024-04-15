import "./App.css";
import List from "./list";
import Nav from "./nav";
import { Route, Routes } from "react-router-dom";

/*eslint-disable*/

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element=""></Route>
      </Routes>
    </>
  );
}

export default App;
