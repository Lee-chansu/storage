function Content(props){
    let {content} = props;
    return(
    <div>
        <label for="post-content">내용</label>
        <input type="text" name="content" id="post-content" 
        value={content}></input>
    </div>
    )
}

export default Content;