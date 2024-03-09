import { useEffect, useRef, useState } from "react";
import "./ReviewForm.css";
import { createReview } from "../api";
import FileInput from "./FileInput";

//제어 컴포넌트 : input의 value 값을 리액트에서 지정하고 제어
//비제어 컴포넌트 : input의 value값을 리액트에서 저장하지 않음 (ex- input(type="file"))

const INITAIL_VALUES = { title: "", rating: 0, content: "", imgFile: "" };

function ReviewForm() {
<<<<<<< HEAD
  const [values, setValues] = useState(INITAIL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
=======
  //입력받은 값을 임시로 저장할 useState만들기
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: "",
  });
>>>>>>> newlcs

  //입력 받은 값들로 state 업데이트
  const handleChange = (name, value) => {
    // state 변경 함수에 콜백함수를 적용 - 매개변수에 현재 state의 값을 가져온다.
    setValues(prevValues => ({ ...prevValues, [name]: value }));
    //[name] : 배열x, 프로퍼티o(key의 역할을 한다.)
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    try {
      setSubmittingError(null); // 처리중 에러x
      setIsSubmitting(true); //값을 처리 중
      await createReview(formData);
    } catch (error) {
      setSubmittingError(error); //에러 캐치
      return;
    } finally {
      setIsSubmitting(false);
    }
    setValues(INITAIL_VALUES);
  };

  const titleRef = useRef();
  const ratingRef = useRef();
  const contentRef = useRef();

  const handleClearClick = () => {
    const titleNode = titleRef.current;
    const ratingNode = ratingRef.current;
    const contentNode = contentRef.current;

    if (!titleNode || !ratingNode || !contentNode) return; //태그가 없으면 종료

    titleNode.value = ""; //태그가 있으면 값 비우기
    ratingNode.value = ""; //태그가 있으면 값 비우기
    contentNode.value = ""; //태그가 있으면 값 비우기
    handleChange("title", null);
    handleChange("rating", null);
    handleChange("content", null);
  };

  return (
    <fieldset>
      <h2>영화 정보 입력</h2>
      <form className="ReviewForm" onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          name="title"
          value={values.title}
          ref={titleRef}
          onChange={handleInputChange}
        />

        <label htmlFor="rating">rating:</label>
        <input
          id="rating"
          name="rating"
          type="number"
          ref={ratingRef}
          value={values.rating}
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

        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
          onClearClick={handleClearClick}
        />

        <div className="btn-wrap">
          <button type="submit">확인</button>
          <button type="button" onClick={handleClearClick}>
            취소
          </button>
        </div>
      </form>
    </fieldset>
  );
}

export default ReviewForm;
