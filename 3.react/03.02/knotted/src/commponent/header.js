import { useState } from "react";
import logo from '../img/knoted_logo.svg'

function Header() {
    let [maxHeight, setMaxHeight] = useState(0);
    


    return(
        <header className="header">
            <div className="container m-0">
                <div className="row row-cols-3 nav">
                    <a href="#" className="logo col-2">
                        <img src={logo} alt="knoted-logo"/>
                    </a>
                    <ul className="menu-list col-8 mt-4 m-0 py-3">
                        <li className="menu-item depth-01">
                            <a href="#"><span>Reservation</span></a>
                            <ul>
                                <li className="depth-02">
                                    <a href="#"><span>픽업 예약</span></a>
                                </li>
                                <li className="depth-02">
                                    <a href="#"><span>대량 주문</span></a>
                                </li>
                                <li className="depth-02">
                                    <a href="#"><span>매장소개</span></a>
                                </li>
                                </ul>
                        </li>
                        <li className="menu-item depth-01">
                            <a href="#"><span>Online Shop</span></a>
                            <ul>
                                <li className="depth-02">
                                    <a href="#"><span>푸드</span></a>
                                </li>
                                <li className="depth-02">
                                    <a href="#"><span>리빙</span></a>
                                </li>
                            </ul>
                            </li>
                            <li className="menu-item depth-01">
                                <a href="#"><span>Event</span></a>
                                <ul>
                                    <li className="depth-02">
                                        <a href="#"><span>이벤트</span></a>
                                    </li>
                                    <li className="depth-02">
                                        <a href="#"><span>공지사항</span></a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item depth-01">
                                <a href="#"><span>Help</span></a>
                                <ul>
                                    <li className="depth-02">
                                        <a href="#"><span>자주 묻는 질문</span></a>
                                    </li>
                                    <li className="depth-02">
                                        <a href="#"><span>1:1 문의</span></a>
                                    </li>
                                    <li className="depth-02">
                                        <a href="#"><span>만족도 조사</span></a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item depth-01">
                                <a href="#"><span>Brand</span></a>
                                <ul>
                                    <li className="depth-02">
                                        <a href="#"><span>스토리</span></a></li>
                                    <li className="depth-02">
                                        <a href="#"><span>채용안내</span></a>
                                    </li>
                                    <li className="depth-02">
                                        <a href="#"><span>제안하기</span></a>
                                    </li>
                                </ul>
                            </li>
                    </ul>
                    <ul className="col-2 btn-wrap mt-3 m-0 d-flex">
                        <li className="login-btn btn">
                            <a href="#" className="login-btn">
                                    <span>Login</span></a>
                        </li>
                        <li className="cart-btn btn ms-5">
                            <a href="#" className="cart"><span>Cart</span></a>
                        </li>
                    </ul>
                </div>
            </div>
    </header>
    )
}

export default Header;