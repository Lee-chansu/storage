import { Link } from "react-router-dom";

function Items(props){
  let {shoes} = props;
  let url = '/detail/'
  return(
  <div className='row'>
  {
    shoes.map((el, i) => {
      return(
        <div className='col-md-4 item'>
          <Link to={url+i}>
            <img src={process.env.PUBLIC_URL + '/img/shoes'+(i+1)+'.jpg'} alt='shoes'></img>
            <h3>{el.title}</h3>
            <p>{el.content}</p>
          </Link>
        </div>
      )
    })
  }
</div>
    
  )
}

export default Items;
