import { useRef, useState } from "react";
import "./reviewForm.css";
import FileInput from "./FileInput";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: "",
  });

  const handleChange = (name, value) => {
    setValues(preValues => ({ ...preValues, [name]: value }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
  };

  const titleRef = useRef();
  const ratingRef = useRef();
  const contentRef = useRef();

  const handleClearClick = () => {
    const titleNode = titleRef.current;
    const ratingNode = ratingRef.current;
    const contentNode = contentRef.current;

    if (!titleNode || !ratingNode || !contentNode) return;

    titleNode.value = "";
    ratingNode.value = 0;
    contentNode.value = "";
    handleChange("title", null);
    handleChange("rating", null);
    handleChange("content", null);
  };

  return (
    <fieldset>
      <h2>음식 정보 입력</h2>
      <form className="ReviewForm" onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          ref={titleRef}
          onChange={handleInputChange}
        />
        <label htmlFor="rating">rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={values.rating}
          ref={ratingRef}
          onChange={handleInputChange}
        />
        <label htmlFor="content">content:</label>
        <textarea
          id="content"
          name="content"
          value={values.content}
          ref={contentRef}
          onChange={handleInputChange}
        />
        <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} onClearClick={handleClearClick} />

        <div className="btn-wrap">
          <input type="submit" value="완료" />
          <button onClick={handleClearClick}>취소</button>
        </div>
      </form>
    </fieldset>
  );
}

export default ReviewForm;
