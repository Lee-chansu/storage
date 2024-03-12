import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchForm(){
``
    const router = useRouter()
    const [value, setValue] = useState('')
    
    // 함수
    const handleChange = (e)=>setValue(e.target.value)
    const handleSubmit = (e)=>{
      e.preventDefault()
      router.push(`/search?q=${value}`)
    }

    return (
      <form onSubmit={handleSubmit}>
        <input type="search" name="q" value={value} onChange={handleChange}/>
        <button>검색</button>
      </form>
    )

}