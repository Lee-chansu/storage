import Title from "../component/title";
import Content from "../component/content";
import Header from '../component/header';

function Main(props){
    let {blog, setBlog, isLogin, setIsLogin} = props;
    return(
        <>
            <div className="sec">
                <form action="/add" method="post" id="post-form">
                    <div className="blog-post container">
                        <h2 className="title text-center">✨Blog Post✨</h2>
                        <Title></Title>
                        <Content></Content>
                        <button type="submit" id="post-commit">등록</button>
                        <button type="reset"id="post-cancel">취소</button>
                    </div>
                </form>
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
                        <p>{blog.totalPage}</p>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Main;