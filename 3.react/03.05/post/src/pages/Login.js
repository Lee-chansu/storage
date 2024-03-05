import Sec from "../component/Sec.js"
import Form from '../component/Form.js'
import {Link} from 'react-router-dom'

function Login() {
  return(
    <>
      <Sec title={'✨ User Login ✨'}>
        <Form className={'row row-cols-1 login'}/>
        <div className="row link login">
          <p><Link to="/join" className="link-primary">회원가입</Link> 하러가기</p>
        </div>
      </Sec>
    </>
  )
}
export default Login
