import { Link } from 'react-router-dom';
import '../css/header.css';

function Header(){
    return(
       <header className="header max-w-100">
            <div className="container max-w-100">
                <div className="row row-cols-3">
                    <nav className="col col-3 nav text-center ">
                        <ul className='menu-list d-flex js al m-0'>
                            <li className='depth mx-2'>Home</li>
                            <li className='depth mx-2'>About</li>
                            <li className='depth mx-2'>Member</li>
                            <li className='depth mx-2'>Help</li>
                        </ul>
                    </nav>
                    <h1 className="logo col col-5 text-center">Welcome</h1>
                    <div className='button-wrap col d-flex al text-center'>
                        <Link to='/login' className='link-txt'>
                            <span className='me-3'>💗Login</span>
                        </Link>
                        <Link to='/join' className='link-txt'>
                            <span className='me-5 '>🧡회원가입</span>
                        </Link>
                    </div>
                </div>
            </div>
       </header>
    )
}

export default Header;