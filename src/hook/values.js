import { useState } from "react"


function useValues(){
const[search,setSearch]=useState('')
const[isLogin,setIsLogin]=useState(false)
const[authData,setAuthData]=useState({})
const[addTaskBtn,setAddTaskBtn]=useState(false)


const values={
    search,setSearch,isLogin,setIsLogin,authData,setAuthData,addTaskBtn,setAddTaskBtn
}


return values
}
export default useValues