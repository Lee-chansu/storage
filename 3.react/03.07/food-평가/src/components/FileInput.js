// 현재 dom 요소 가져오기(선택하기)
import {useEffect, useRef, useState} from 'react';

function FileInput({ name, value, initialPreview, onChange, onClearClick }) {

  const [preview, setPreview] = useState(initialPreview)
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue); // 부모의 handleChange를 onCahange에 받아와서 실행
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
    if (onClearClick) { // onClearClick이 존재하면 실행
      onClearClick();
    }
  };

  useEffect(() => {
    if (!value) {
      setPreview(''); // 이미지 없으면 초기화
      return;
    }
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);

  return (
    <div>
      {preview && <img src={preview} alt="이미지 미리보기" />}
      <input type="file" onChange={handleChange} ref={inputRef}/>
      <button type="submit" onClick={handleClearClick}>❌</button>
    </div>
  )
  
}

export default FileInput;
