import { Outlet } from "react-router-dom";

function Event() {
  return (
    <>
      
      <section className='sec detail'>
        <div className='container'>
            <h2>오늘의 이벤트</h2>
            <p><a href="/event/one">one</a></p>
            <p><a href="/event/two">two</a></p>
            <Outlet></Outlet>
          <div className='row'>
          </div>
        </div>
      </section>
    </>
  );
}
export default Event;
