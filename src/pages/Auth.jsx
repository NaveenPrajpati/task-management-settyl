import React, { useContext } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Mycontext } from '../App';


export default function Auth() {
  const {authData,isLogin,setIsLogin,setAuthData,setAddTaskBtn,addTaskBtn}=useContext(Mycontext)
  
let data2=JSON.parse(localStorage.getItem('userData'))
     console.log(data2)
  
  
      if (data2?.user?.role=='admin') {
       
        return <Outlet />
      } else 
       return <Navigate to="/" replace={true} />
      
    };

