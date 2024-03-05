import {Link} from 'react-router-dom'

function Header() {
  return(
    <>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col login-info">
              <Link to="/join" className='login'>회원가입</Link>
              <Link to="/login" className='login'>로그인</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
