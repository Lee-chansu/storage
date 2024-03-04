import { Link } from "react-router-dom";

function Header(props){
    let {blog, isLogin, setIsLogin} = props;

    return(
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-9 logo-wrapper">
                            <Link to="/"><h1 className="logo">Welcome Blog</h1></Link>
                    </div>
                    <ul className="col-3 gnb d-flex">
                        <li className="mx-2">메인</li>
                        <li className="mx-2">게시판</li>
                        <li className="mx-2"><span>로그인</span></li>
                        <li className="mx-2">로그아웃</li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;