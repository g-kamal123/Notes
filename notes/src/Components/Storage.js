import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../Server'

export const Storage = createContext()

const Contxt = (props) => {
    const nav = useNavigate()
    const [pri,setPri] = useState()
    const [text,setText] = useState("")
    // console.log(new Date())
    const searchResult=async(val,text1)=>{
        const response = await api.get(`/notes/${val.id}`)
        setPri(response.data)
        setText(text1)
        nav('/allnotes')
    }
    // console.log(pri)
    const srch =(val)=>{
        setText(val)
    }
  return (
    <Storage.Provider value={{
        searchResult:searchResult,
        pri:pri,text,srch:srch}}>
         {props.children}
     </Storage.Provider>
  )
}

export default Contxt