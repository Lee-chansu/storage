function Header() {
    return(
        <header className="header">
            <div className="container">
                <div className="row row-cols-2">
                    <h1 className="logo"></h1>
                    <nav className="col d-flex">
                        <ul className="global">
                            <li><span>고객센터</span></li>
                            <li><span>업무제휴</span></li>
                            <li><span>언어선택</span></li>
                        </ul>
                        <ul className="gnb">
                            <li><span>Home</span></li>
                            <li><span>Member</span></li>
                            <li><span>Login</span></li>
                            <li><span>Join</span></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )


}

export default Header;