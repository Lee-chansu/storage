import { useNavigate } from "react-router-dom";

function Join(props){
    let {blog, setIsLogin} = props;
    let navigate = useNavigate();
    const toLoginPage = ()=>{navigate('/login')}
    
    return(
        <>
            <section class="blog-post sec">
                <div className="container">
                    <h2 className="title text-center">✨User Join✨</h2>
                    <div className="item">
                        <input type="text" name="username" id="username" placeholder="아이디" 
                        value="">
                        </input>
                    </div>
                    <div className="item">
                        <input type="password" name="password" id="password" placeholder="비밀번호"
                        value="">
                        </input>
                    </div>
                    <button type="button" id="post-commit">완료</button>
                    <button type="reset"id="post-cancel" onClick={toLoginPage} >취소</button>
                </div>
                </section>
        
        </>
    )
}

export default Join;