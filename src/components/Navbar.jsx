import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../App";

const Navbar = () => {
  const {authData,isLogin,setIsLogin,setAuthData,setAddTaskBtn,addTaskBtn}=useContext(Mycontext)
const navigation=useNavigate()

function handlelogout(){
          navigation('/')
            localStorage.clear()
            setIsLogin(false)
            setAuthData({})
}
    return (
      <nav className="bg-blue-500 p-2">
        <div className="mx-20 flex items-center justify-between ">
          <p className="font-bold cursor-pointer hover:scale-105" onClick={()=>navigation('/')}>TaskManage</p>
          <div className="">
          <span>{authData?.user?.name}</span>
        
        {authData?.user?.role=='admin' &&  <button onClick={()=>setAddTaskBtn(!addTaskBtn)} className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow">
            Add Task
          </button>}
        {!isLogin &&   <button onClick={()=>navigation('/login')} className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow">
           login
          </button>}
         {!isLogin && <button onClick={()=>navigation('/signup')} className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow">
            SignUp
          </button>}
          {isLogin && <button onClick={handlelogout} className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow">
            Logout
          </button>}
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  