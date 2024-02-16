document.addEventListener('DOMContentLoaded', () => {
    let loginInfo = document.querySelector('.login-info')
    let loginState = loginInfo.dataset.loginState
    console.log(loginState)
    let tag = ''

    if(loginState != "false"){
        tag =  `<span class="username">${loginState}</span>
        <span class="message">님 반갑습니다.</span>
        <a href="/logout">로그아웃</a>`
    }
    else{
        tag = `<a href="/login">로그인</a>`
    }
    loginInfo.innerHTML = tag
})