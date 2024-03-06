import {useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';


function Detail(props) {
  let {shoes} = props;
  let id = parseInt(useParams().id);
  
  return (
    <>
      <section className='sec detail'>
        <div className='container'>
            <h2>디테일 페이지</h2>
          <div className='row'>
            <div className="col-md-6 item-detail">
              <img src={process.env.PUBLIC_URL + '/img/shoes'+(id+1)+'.jpg'}></img>
            </div>
            <div className="col-md-6">
              <h3 className="pt-5">{shoes[id].title}</h3>
              <p>{shoes[id].content}</p>
              <p>{shoes[id].price}</p>
              <Button className="btn btn-danger">주문하기</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Detail;
