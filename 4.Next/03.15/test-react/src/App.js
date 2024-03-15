import { useEffect, useRef, useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  const [heart, setHeart] = useState("♥");
  const goodref = useRef(null);

  const plusGood = () => {
    setValue(value + 1);
    if(value >= 10){
      console.log(value, heart)
    }
    
  };

  useEffect(() => {
    if (value >= 10) {
      setHeart("💛");
    }if (value >= 20) setHeart("💗");
  }, [value, heart]);

  const cssStyle = { cursor: "pointer" };
  return (
    <div className="App">
      <span style={cssStyle} onClick={plusGood} ref={goodref}>
        {heart}
      </span>{" "}
      {value}
    </div>
  );
}

export default App;
