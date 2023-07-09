import React, { useContext, useEffect, useState } from 'react'
import { getAllTasks } from '../services/TaskService';
import { Mycontext } from '../App';
import D3Chart from '../components/D3Chart';
import D3Chart2 from '../components/D3Chart2';

export default function TaskPage() {
  const [allTasks, setAllTasks] = useState([])

  const {setAuthData,setIsLogin}=useContext(Mycontext)
 
  useEffect(() => {
    const usData=JSON.parse(localStorage.getItem('userData'))
    if(usData){
      setAuthData(usData)
      setIsLogin(true)
    }
    
    const fetchAllMessages = async () => {
      await getAllTasks()
        .then(res => {
          setAllTasks(res.data.tasks)
        })
    };

    fetchAllMessages()

  }, [])

  return (
    <div>

    <div className='text-red-400 bg-black'>TaskPage</div>
    <div>
  {allTasks.map((it,index)=>( <div key={index}>
<p>{it.title}</p>
<p>{it.description}</p>
<p>{it.dueDate}</p>
<p>{JSON.parse(it.assignedUser).name}</p>
<p>{it?.status}</p>
  </div> ))}
 
</div>

<div>
  <D3Chart2 data={allTasks}/>
</div>

    </div>
  )
}
