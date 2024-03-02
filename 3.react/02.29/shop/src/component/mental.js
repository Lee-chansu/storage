import { useEffect, useState } from "react";

function Mental() {
  let [active, setActive] = useState(false);

  useEffect(()=>{
    let roop = setInterval(()=>{setActive(!active)}, 1000)
    return(()=>{clearTimeout(roop)})
  })

    
  return(
    <>
    {
        (active == true) ?
          <div className="wrap"><span className="">☆★☆★☆★☆★정신차리세요☆★☆★☆★☆★</span>
          <span className=""> Σ(ﾟ∀´(┗┐ヽ(･∀･ )ﾉ </span></div>
          :
          <div className="wrap"><sapn className="">★☆★☆★☆★☆정신차리세요★☆★☆★☆★☆</sapn>
          <span className=""> ヽ(　･∀･)ﾉ┌┛Σ≡( #･３･)</span></div>
      }
    </>
  )
}
export default Mental;