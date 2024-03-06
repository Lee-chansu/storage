import { useState } from "react"

function EditBtn(props){

  const {editable, setEditable, readonly, setReadonly} = props
  const [edit, setEdit] = useState(false)
  const [del, setDel] = useState(false)
  

  const handelBtn = (e)=>{
    setEdit(!edit);
    setDel(!del);
    (readonly == '') ? setReadonly('') : setReadonly('readonly');
    (editable == '') ? setEditable('edit') : setEditable('');
    
  }

  return(
    <div className="btn-wrap">
      <button className="edit" onClick={handelBtn}>{(edit)? '✅' : '✏' }</button>
      <button className="del" >{(del)? '❌':'🗑' }</button>
    </div>
  )
}

export default EditBtn