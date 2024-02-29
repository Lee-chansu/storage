import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from '../data/data'
import { Route, Routes, Link } from 'react-router-dom';

/*eslint-dsabled*/

function App() {
  let [shoes] = useState(data);
  return (
    <>
      <Routes>
        <Route path="/detail" element={<div>detail</div>}></Route>
        <Route path="/about" element={<div>about</div>}></Route>
      </Routes>

      <Header></Header>
      <section className='visual'>
      </section>
      <section className='sec'>
        <div className='container'>
          <div className='row'>
            {shoes.map((el, i) => {
              return(<><Items key={el.id} shoes={el} i={i}></Items> </>)
            })}
          </div>
        </div>
      </section>

    </>
  );
}

function Items(props){
  let {shoes, i} = props;
  return(
    <div className='col-md-4 item'>
      <img src={process.env.PUBLIC_URL + '/img/shoes'+(i+1)+'.jpg'} alt='shoes'></img>
      <h3>{shoes.title}</h3>
      <p>{shoes.content}</p>
    </div>
  )
}

function Header() {
  return(
    <header>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )

  
}

export default App;
