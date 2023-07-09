import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/UserService';
import { toast } from 'react-hot-toast';
import { Mycontext } from '../App';


function Signup() {
    const [isActive, setIsActive] = useState(true);
    const navigate=useNavigate()
    const[otpbtn,setOtpbtn]=useState(false)
    const [signupData,setSignupData]=useState({
        name:"",
        email:"",
        role:"user",
        password:""
    })

    function handleChange(event){
        setSignupData({...signupData,[event.target.name]:event.target.value});
      
        
    }




    function savehandle(event){
        event.preventDefault();


    registerUser(signupData)
    .then(res=>{
        if(res.status===201)
        toast('user registered successfully')
        console.log(res.data.message)

        setSignupData({
          name:"",
          email:"",
          role:"",
          password:""
      })
        navigate('/login')
    })
    .catch(error=>{
        console.log(error)
    })
    }


    const toggleButton = () => {
      setIsActive(!isActive);
      if(signupData.role=='admin'){
        setSignupData(pre=>{return {...pre,role:'user'}});}
        else{
          setSignupData(pre=>{return {...pre,role:'admin'}});}
    };

  return (
    <div>
    <div className="mt-20 flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={savehandle} className=" px-6 py-6 rounded shadow-md text-black w-full">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
            Welcome To Messaging Service
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup Here
          </h2>

                    <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Register As
              </label>
              <div
                className={`p-1 rounded-md w-fit  bg-gray-200 mt-2 cursor-pointer`}
                onClick={toggleButton}
              >
                <div className='flex relative justify-between gap-3 items-center px-2'>
                  <p className={`mx-1`}>user</p>

                  <div
                    className={`w-fit absolute  h-6 rounded-md bg-green-400 text-white px-1 font-serif font-semibold ${isActive ? 'left-0 ' : 'right-0'
                      } shadow-md`}
                  >{`${isActive ? 'user' : 'admin'}`}</div>

                  <p className={`mx-1`}>admin</p>
                </div>
              </div>
            </div>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded my-4 "
                        name="name"
                        placeholder="Name" 
                        required
                        value={signupData.name}
                        onChange={handleChange}
                        />
                    

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="email"
                        required
                        onChange={handleChange}
                        value={signupData.email}
                        placeholder="Email" />


                   

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        required
                        value={signupData.password}
                        onChange={handleChange}
                         />
                        
                        
                     
                    <button
                       type='submit'
                        className="w-full text-center py-2 rounded bg-green text-white bg-green-400 focus:outline-none my-1"
                    >Create Account</button>
              
             

                    
                </form>
                

                <div className="text-grey-dark mt-4">
                    Already have an account? 
                    <Link className="no-underline border-b border-blue text-blue-600" to={"/login"}>
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
        </div>
  )
}

export default Signup