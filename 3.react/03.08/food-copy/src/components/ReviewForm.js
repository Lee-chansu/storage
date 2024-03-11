function ReviewForm() {

    return(
        <form action="" >
            <input type="text" name="title" value="" />
            <input type="number" name="rating" value="0" />
            <textarea name="content" value="" />

            <input type="submit" value="완료"/>
            <button>취소</button>
        </form>
    )
}

export default ReviewForm;
