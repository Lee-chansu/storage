import Sec from "../component/Sec.js"
import Form from '../component/Form.js'
import {Link} from 'react-router-dom'

function Join() {
  return(
    <>
      <Sec title={'🤝 Resister'}>
        <Form className={'row row-cols-1 join'}/>
        <div className="row link join">
          <p><Link to="/login" className="link-primary">로그인</Link> 하러가기</p>
        </div>
      </Sec>
      
    </>
  )
}
export default Join
