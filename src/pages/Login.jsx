import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  createNewPassword, loginUser } from '../services/UserService';
import { Toaster, toast } from 'react-hot-toast';
import { Mycontext } from '../App';




export default function Login() {

  const [resetOpt, setResetOpt] = useState(false)

  const {setAuthData, setIsLogin}=useContext(Mycontext)


  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  })

  
  const [resetData, setResetData] = useState({
    email: "",
    newPassword: "",
    confNewPassword: ""
  })

  const navigate = useNavigate();

  function handleChange(event) {
    setloginData({ ...loginData, [event.target.name]: event.target.value });
  }

  function handleChangePass(event) {
    setResetData({ ...resetData, [event.target.name]: event.target.value });

  }

  


  function handleNewPassword(event) {
    event.preventDefault()
    createNewPassword(resetData)
      .then(res => 
        { console.log(res.data)
        toast(res.data.message) 
      setResetOpt(false)
      })
      .catch(error => {
        console.log("request mai error aara hai")
        console.log(error)
        toast(error.response.data.message)
      })
  }


  function handle(event) {
    event.preventDefault();

    loginUser(loginData)
      .then(res => {
      console.log(res.data)
        localStorage.setItem('userData', JSON.stringify(res.data))
        setAuthData(res.data)
        toast('loging successfully')
     
        if(res.data.user.role=='admin'){
       navigate('/admin/dashboard')
        }
        else
       navigate('/user/dashboard')

      })
      .catch((error) => {
        console.log("request mai error aara hai")
        toast(error.response.data.message)
        console.log(error)

      })
  }

  function handlePass(event) {
    event.preventDefault()
  setResetOpt(true)

  }


  const [isActive, setIsActive] = useState(true);

  const toggleButton = () => {
    setIsActive(!isActive);

  };


  return (
    <div className='p-5'>
     
      {!resetOpt && <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
            Welcome To Messaging Service
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handle}>

         

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <p className="font-semibold text-green-600 hover:text-green-500 cursor-pointer" onClick={handlePass}>
                    Forgot password?
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>

              <button
                type='submit'
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
        
              
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-300">
            Not a member?{' '}
            <Link to={"/signup"} className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Sign up
            </Link>
          </p>

        </div>
      </div>}


      {resetOpt && <form onSubmit={handleNewPassword} className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
            Verify your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter valid email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="text"
                  onChange={handleChangePass}
                  placeholder='enter otp'
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
       
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter New password
              </label>
              <div className="mt-2">
                <input
                  name="newPassword"
                  type="password"
                  onChange={handleChangePass}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter confirm password
              </label>
              <div className="mt-2">
                <input
                  name="confNewPassword"
                  type="password"
                  onChange={handleChangePass}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                type='submit'
                className="mb-2 flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Reset Password
              </button>
              
            </div>
          </div>

        </div>

      </form>}
    {resetOpt &&  <button
                onClick={()=>setResetOpt(false)}
                className="sm:max-w-sm mx-auto flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                cancel
              </button>}
    </div>
  )
}

