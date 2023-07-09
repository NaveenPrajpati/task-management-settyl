import { useContext, useEffect, useState } from 'react'
import { getAllUsers } from '../services/UserService'
import { addTask, getAllTasks } from '../services/TaskService'
import { FaWindowClose } from 'react-icons/fa'
import D3Chart from '../components/D3Chart'
import { Mycontext } from '../App'
import { toast } from 'react-hot-toast'

function AdminDashboard() {
  const [allTasks, setAllTasks] = useState([])
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const [taskBox, setTaskBox] = useState(false)


  const {authData,isLogin,setIsLogin,setAuthData,setAddTaskBtn,addTaskBtn}=useContext(Mycontext)


  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: Date,
    status: '',
    assignedUser: '',
  })




  function handleClose() {
    setmessageBox(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers()
        .then(res => {
          console.log(res.data)
          setUsers(res.data.users)
        })
        .catch(error => console.log(error))
    }
    fetchData()
  }, [])

  useEffect(() => {
    
    const fetchAllMessages = async () => {
      await getAllTasks()
        .then(res => {
          setAllTasks(res.data.tasks)
        })
    };

    fetchAllMessages()

  }, [])



  function handleChange(event) {
    setTaskData({ ...taskData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault();
console.log(taskData)
    await addTask(taskData)
      .then(res => {
        console.log(res.data)
        toast('task created');
        setmessageBox(false)
      })
      .catch(error => console.log(error))
  }




  return (
    <div className=' bg-slate-400 mx-auto relative p-2 h-screen  '>
 <D3Chart data={allTasks}/>
      <div className=' sm:w-1/2  p-2 flex justify-between mx-auto'>
<div>
  {allTasks.map((it,index)=>( <div key={index}>
<p>{it.title}</p>
<p>{it.description}</p>
<p>{it.dueDate}</p>
<p>{JSON.parse(it.assignedUser).name}</p>
  </div> ))}
 
</div>
        {addTaskBtn && <form onSubmit={handleSubmit} className=" px-6 py-6 rounded shadow-md text-black ">
          <FaWindowClose className='text-red-400 text-2xl' onClick={()=>setAddTaskBtn(!addTaskBtn)} />
          <h1 className="mb-8 text-3xl text-center">Send message to Users</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded mb-4 uppercase"
            name="title"
            placeholder="title"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded mb-4"
            name="description"
            placeholder="description"
            required
            onChange={handleChange}
          />


          <input
            type='date'
            className="block border border-grey-light w-full p-2 rounded mb-4"
            name="dueDate"
            onChange={handleChange}
            required
            placeholder="Due Date" />



          <select name='assignedUser' onChange={handleChange} className='w-full p-1 rounded-sm mb-2 outline-none' required>
            <option value=''>Assign User</option>
            {users?.map((li, index) => (
              <option key={index} value={JSON.stringify({id:li.id,name:li.name})} >
                {li.name}
              </option>
            ))}
          </select>
          <br />



          <button type='submit' className='px-2 bg-blue-500 text-white font-semibold rounded-md'>Create Task</button>


        </form>}



      </div>

    </div>
  )
}

export default AdminDashboard
