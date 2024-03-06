import Title from "../component/title";
import Content from "../component/content";
import Header from '../component/header';

function MainLogin(props){
    let {blog, setBlog, isLogin, setIsLogin} = props;
    return(
        <>
        
            <div class="sec">
                <div className="blog-post container">
                    <h2 className="title text-center">✨Blog Post✨</h2>
                    <Title></Title>
                    <Content></Content>
                    <button type="button" id="post-commit">등록</button>
                    <button type="button" id="post-cancel">취소</button>
                </div>
                <hr></hr>
                <div className="blog-list container">  
                    <h2 className="title text-center">Blog List</h2>
                        {blog.map((el)=>{
                            return(
                                <div className="blog-item item">
                                    <Title key={el.id} title={el.title}></Title>
                                    <Content key={el.id} content={el.content}></Content>
                                    <button type="button" className="edit">수정</button>
                                    <button type="button" className="del">삭제</button>
                                </div>
                            )
                        })}
                    <div className="pagination">
                        <p></p>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default MainLogin;