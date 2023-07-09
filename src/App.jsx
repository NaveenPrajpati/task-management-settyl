import { createContext, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import TaskPage from './pages/TaskPage'
import Navbar from './components/Navbar'
import UserDashboard from './pages/UserDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Auth from './pages/Auth'
import useValues from './hook/values'
import PrivateRoute from './components/PrivateRoute'
export const Mycontext=createContext()

function App() {
  const [count, setCount] = useState(0)
  const values=useValues()

  return (
   
  <Mycontext.Provider value={values}>
<Navbar/>
   <Routes>

   <Route path={'/'} element={<TaskPage/>}/>
   <Route path={'/login'} element={<Login/>}/>
   <Route path={'/signup'} element={<Signup/>}/>
   
   
   {/* protected routes */}
    <Route path='/admin/' element={<Auth/>}>
      <Route path='dashboard' element={<AdminDashboard/>}/>
    </Route>
    <Route path='/user/dashboard' element={<PrivateRoute > <UserDashboard/> </PrivateRoute>}> 
    </Route>
    <Route path="*" element={<Link to="/" />} />
   </Routes>
   </Mycontext.Provider>
    
  )
}

export default App
