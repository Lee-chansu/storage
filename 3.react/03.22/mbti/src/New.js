import { Link } from 'react-router-dom';
import MBTIselect from './MBTIselect';
import { useState } from 'react';
import generateColorCode from './generateColorCode';

function New(){

  const [formValue, setFormValue] = useState({mbti : 'ESTJ', colorCode : '#000000'})

  function handleChange(name, value){
    setFormValue((item) => ({
      ...item, [name] : value
    }))
  }

  function handleRandomClick(){
    const nextColorCode = generateColorCode()
    handleChange('colorCode', nextColorCode)
  }

  return (
    <div>
      <h1>새컬러 등록하기</h1>
      <Link to="/">
        <img src='/images/x.svg' alt='취소'/>
      </Link>
      <h2>MBTI {formValue.mbti}</h2>
      <MBTIselect 
        value={formValue.mbti}
        onChange={(newMbti)=> handleChange('mbti', newMbti)}
      />
      <h2>color</h2>
      <img src='/images/repeat.svg' alt='랜덤' onClick={handleRandomClick } />
      <input 
        name='colorCode' 
        value={formValue.colorCode}
        onChange={(e)=> handleChange('colorCode',e.target.value)}
      />
      <button>컬러등록</button>
    </div>
  )
}

export default New;