import React, { useContext } from 'react'
import { Mycontext } from '../App';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
  const authData=JSON.parse(localStorage.getItem('userData'))

  console.log(authData)

    if (authData?.user?.role=='user') {
      return children;
    } else {
     return <Navigate to="/" replace={true} />
    }
  
}
