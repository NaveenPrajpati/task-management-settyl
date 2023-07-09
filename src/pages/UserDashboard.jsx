import React, { useContext, useEffect, useState } from 'react'
import { getAllTasks,  updateTask } from '../services/TaskService'
import { FaWindowClose} from 'react-icons/fa'


import { toast } from 'react-hot-toast'
import { Mycontext } from '../App'
import D3Chart from '../components/D3Chart'


function UserDashboard() {

const[user,setUser]=useState('')
const [allTasks, setAllTasks] = useState([])
const[newStatus,setNewStatus]=useState('')
const[sendMessage,setSendMessage]=useState(false)
const[messages,setMessages]=useState([''])
const[showMessage,setShowMessage]=useState()
const[showMessageFrom,setShowMessageFrom]=useState(false)
const[price,setPrice]=useState('')

const {search,setSearch}=useContext(Mycontext)




  function handleClose(){
    setShowMessageFrom(false)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData')).user;
    setUser(user);
    const fetchAllMessages = async () => {
      await getAllTasks()
        .then(res => {
          const newArr=res.data.tasks.filter(it=>JSON.parse(it.assignedUser).id==user.id)
          console.log(newArr)
          setAllTasks(newArr)
        })
    };
    fetchAllMessages()
  }, [])

  function handleChange(event){
     setNewStatus(event.target.value)
  }

 async function updateStatus(id,nstatus){
  console.log(id,nstatus)
    await updateTask(id,{status:nstatus})
    .then(res=>{
      toast('status updated')

      console.log(res.data.message)
    })
    .catch(error=>console.log(error))
  }

  return (
  
    
    <div className='bg-slate-200 mx-auto relative p-2 h-screen '>


<div className='mx-auto  flex gap-2  justify-between px-2'>
<div>
  {allTasks.map((it,index)=>( <div>
<p>{it.title}</p>
<p>{it.description}</p>
<p>{it.dueDate}</p>
<p>{JSON.parse(it.assignedUser).name}</p>
<select name="status" id="" onChange={(event)=>updateStatus(it._id,event.target.value)}>
  <option value="" >{it.status?it.status:'update Status'}</option>
  <option value="hafldone" >half</option>
  <option value="stated" >completed</option>
  <option value="stated" >started</option>
</select>
  </div> ))}
 
</div>

<div>
  <D3Chart/>
</div>
       
  
      </div>
      </div>
          
  )
}

export default UserDashboard