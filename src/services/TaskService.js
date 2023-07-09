import axios from 'axios';



const BaseUrl=`http://localhost:4000/task`;
// Request interceptors for API calls
axios.interceptors.request.use(
  config => {
    if(localStorage.getItem('userData'))
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// const token=()=>{
  
//   if(localStorage.getItem('userData'))
//   return JSON.parse(localStorage.getItem('userData')).token

 
// }
// const config={
//   headers:{
//     Authorization:`${"Bearer "+ token()}`
//   }
// }




  export const getAllTasks =()=>{
        return axios.get(BaseUrl);
    }
  export const getOrderId =()=>{
        return axios.get(BaseUrl+`/id`);
    }
  export const updateTask =(id,message)=>{
        return axios.put(BaseUrl+`/${id}`,message);
    }
  export const addTask =(message)=>{
        return axios.post(BaseUrl,message);
    }



    
   
