import { useNavigate } from "react-router-dom";

function Login(props){
    let {blog, setIsLogin} = props;
    let navigate = useNavigate(); 
    const toHome = ()=>{navigate('/')}
    const toJoin = () => {navigate('/join');};

    return(
        <>
            <section class="blog-post sec">
                <div className="container">
                    <h2 className="title text-center">✨User Login✨</h2>
                    <div className="item">
                        <input type="text" name="username" id="username" placeholder="아이디" 
                        value="tree">
                        </input>
                    </div>
                    <div className="item">
                        <input type="password" name="password" id="password" placeholder="비밀번호"
                        value="1234">
                        </input>
                    </div>
                    <button type="button" id="post-commit">로그인</button>
                    <button type="reset"id="post-cancel" onClick={toHome}>취소</button>
                    <button type="reset"id="to-jo" onClick={toJoin}>회원가입</button>
                </div>
            </section>
        
        </>
    )
}

export default Login;