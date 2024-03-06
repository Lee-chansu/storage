import { useEffect, useRef, useState } from "react";

//현재 dom 요소 가져오기(선택하기)
function FileInput({ name, value, onChange, onClearClick }) {
  let [img, setImg] = useState(null);

  const inputRef = useRef();

  const handleChange = e => {
    if(!e.target.value) {
        setImg(null);
        return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const imgDataUrl = reader.result;
      setImg(imgDataUrl);
    };
    reader.readAsDataURL(file);
    onChange(e);
    //부모의 handleChange를 onChange에 받아와서 실행
  };

//   useEffect(()=>{
//     if(!value) return;
//     const nextPreview = URL.createObejctURL(value)
//     setPreview(nextPreview)
//   }, [value])

  onClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    setImg(null);
    inputNode.value = "";
  };

  return (
    <div>
      <img src={img} alt="이미지 미리보기" />
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
