import { useState } from "react";

function Header() {
    let [height, setHeight] = useState(0)

    return(
        <header class="header container-fluid px-5">
            <a href="#" class="logo">
                <img src="knotted_images/knoted_logo.svg" alt="knoted-logo"></img>
            </a>
            <div class="head middle row text-center">
                <ul class="menu-list col p-3">
                    <li class="menu-item depth-01">
                        <a href="#"><span>Reservation</span></a>
                        <ul>
                            <li class="depth-02">
                                <a href="#"><span>픽업 예약</span></a>
                            </li>
                            <li class="depth-02">
                                <a href="#"><span>대량 주문</span></a>
                            </li>
                            <li class="depth-02">
                                <a href="#"><span>매장소개</span></a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item depth-01">
                        <a href="#"><span>Online Shop</span></a>
                        <ul>
                            <li class="depth-02">
                                <a href="#"><span>푸드</span></a>
                            </li>
                            <li class="depth-02">
                                <a href="#"><span>리빙</span></a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item depth-01">
                        <a href="#"><span>Event</span></a>
                        <ul>
                            <li class="depth-02">
                                <a href="#"><span>이벤트</span></a>
                            </li>
                            <li class="depth-02">
                                <a href="#"><span>공지사항</span></a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item depth-01">
                        <a href="#"><span>Help</span></a>
                        <ul>
                            <li class="depth-02">
                                <a href="#"><span>자주 묻는 질문</span></a>
                            </li>
                            <li class="depth-02">
                                <a href="#"><span>1:1 문의</span></a>
                            </li>
                            <li class="depth-02">
                                <a href="#"><span>만족도 조사</span></a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item depth-01">
                        <a href="#">Brand<span></span></a>
                        <ul>
                            <li class="depth-02">
                                <a href="#"><span>스토리</span></a></li>
                            <li class="depth-02">
                                <a href="#"><span>채용안내</span></a>
                            </li>
                            <li class="depth-02">
                                <a href="#"><span>제안하기</span></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="head right row-3">
                <ul class="menu-list">
                    <li class="login">
                        <a href="login.html" class="login-btn">
                            <span>Login</span></a>
                    </li>
                    <li class="cart ms-5">
                        <a href="#" class="cart-btn"><span>Cart</span></a>
                    </li>
                </ul>
            </div>
    </header>
    )
}

export default Header;