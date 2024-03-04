import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

//useEffect란? 컴포넌트의 LifeCycle에 맞춰서 실행하고 싶은 코드들을 실행할 수 있다.
// = LifeCycle Hook

// 컴포넌트의 LifeCycle(생성주기)
// 생성 - mount
// 재렌더링 - update
// 삭제 - unmount

// mount + update 실행됨


function About() {
  let [count, setCount] = useState(0)
  let [good, setGood] = useState(0)

  useEffect(()=>{
    console.log('안녕')
    // 두번째 인자가 비어있으면 : mount + update 됐을 때 실행
    // 두번째 인자가 안비어있으면 : mount 될 때만 실행(처음에만 실행)
    // [state변수] : 해당 state Update 될때마다 실행됨
  }, [count])
  return (
    <>
      {/*about*/}
      <section className='sec detail'>
        <div className='container'>
          <h2>About 페이지</h2>
            <button onClick={()=>{setCount(count+1)}}>Count 재렌더링!{count}</button>
            <button onClick={()=>{setGood(good+1)}}>Good 재렌더링!{good}</button>
            <p>{count}</p>
            <p>{good}</p>
            <Outlet></Outlet>
        </div>
      </section>
    </>
  );
}
export default About;
