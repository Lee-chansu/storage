import { useEffect, useState, useRef } from 'react';
import './ReviewForm.css';
import FileInput from './FileInput';


// 제어 컴포넌트 : input의 value값을 리액트에서 지정하고 제어
// 비제어 컴포넌트 : input의 value값을 리액트에서 저장하지 않음 (대표적 file input)
const INITIAL_VALUES = {
  title : '',
  rating : 0,
  content : '',
  imgFile : null
}

function ReviewForm({
  initialValues = INITIAL_VALUES, 
  initialPreview, 
  onSubmit,
  onSubmitSuccess,
  onCancel
}) {

  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const handleChange = (name, value)=> {
    setValues( (prevValues) => ({ ...prevValues, [name]: value }) ) // 해당 프로퍼티 수정
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // (submit기본동작 : 서버로 데이터 전송 + get리퀘스트)
  const handleSubmit = async(e)=>{

    e.preventDefault(); // 페이지새로고침x, 서버로 전송x
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('rating', values.rating);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);

    let result;// 여기 추가
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);// 추가- creatReview가 실행, 수정-updateReview
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const {review}  = result // formData추가한 결과를 result.review에 담아온다
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  }

  const titleRef = useRef();
  const ratingRef = useRef();
  const contentRef = useRef();

  const handleClearClick = () => {
    const titleNode = titleRef.current;
    const ratingNode = ratingRef.current;
    const contentNode = contentRef.current;

    if (!titleNode || !ratingNode || !contentNode) return;

    titleNode.value = '';
    ratingNode.value = '';
    contentNode.value = '';

    handleChange('title', null);
    handleChange('rating', null);
    handleChange('content', null);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
     
      
      <label htmlFor="title" >Title</label>
      <input id="title" name="title"value={values.title} 
          onChange={handleInputChange}
          ref={titleRef}
      />
      
      <label htmlFor="rating">Rating</label>
      <input id="rating" type="number" name="rating" value={values.rating}  
        onChange={handleInputChange}
        ref={ratingRef}
      />

      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" value={values.content} 
        onChange={handleInputChange}
        ref={contentRef}
      />

      <FileInput name="imgFile" 
        value={values.imgFile} 
        initialPreview={initialPreview}
        onChange={handleChange} 
        onClearClick={handleClearClick}
      />
      
      <button disabled={isSubmitting} type="submit">확인</button>
      {onCancel && <button onClick={onCancel}>취소</button>}
    </form>
  );
}

export default ReviewForm;
