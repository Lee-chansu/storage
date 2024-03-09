import { useRef, useState } from "react";

function FileInput({ name, value, onChange, onClearClick }) {
  const [img, setImg] = useState(null);

  const inputRef = useRef();

  const handleChange = e => {
    if (!e.target.value) {
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
  };

  onClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    setImg(null);
    inputNode.value = "";
  };

  return (
    <div>
      <img src={img} alt="이미지 바라보기" />
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
