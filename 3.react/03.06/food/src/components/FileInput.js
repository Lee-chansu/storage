import { useEffect, useRef, useState } from "react";

//현재 dom 요소 가져오기(선택하기)
function FileInput({ name, value, onChange, onClearClick }) {
  let [preview, setPreview] = useState(null);

  const inputRef = useRef();

  const handleChange = e => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
    //부모의 handleChange를 onChange에 받아와서 실행
  };

    useEffect(()=>{
      if(!value) return;
      const nextPreview = URL.createObejctURL(value)
      setPreview(nextPreview)
    }, [value])

  onClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    setPreview(null);
    inputNode.value = "";
  };

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        onChange={handleChange}
        ref={inputRef}
        accept="image/*"
      />
      <button onClick={onClearClick}>❌</button>
    </div>
  );
}

export default FileInput;
