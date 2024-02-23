let regex = {
    emailRegex : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pwdRegex : /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,15}$/,
    nicknameRegex : /^(?=.*[a-z가-힣])[a-z가-힣0-9]{2,10}$/
}

module.exports = regex;