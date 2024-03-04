function Title(props){
    let {title} = props;
    return(
    <div>
        <label for="post-title">제목</label>
        <input type="text" name="title" id="post-title"
        value={title}></input>
    </div>
    )
}

export default Title;