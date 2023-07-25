import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Manufacturer from './Manufacturer'
import Transporter from './Transporter'
import { socket } from '../socket';

function Dashboard() {
  const [userRole, setUserRole] = useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    const tokenStored = localStorage.getItem("auth-token")
    if(!tokenStored){
        toast.error("Please Login first...")
        navigate('/login')
    } else{
      socket.auth.token = tokenStored;
      socket.connect();
      socket.on('connect', function () {
        console.log("Socket connect!")
      });
    }
    const tokenDetailsStored = localStorage.getItem("auth-token-data")
    if(tokenDetailsStored){
      const data = JSON.parse(tokenDetailsStored)
        setUserRole(data.role)
    }
  },[])
  
  return (
        <>
        {userRole === 'Manufacturer' && (
          <Manufacturer/>
        )}
        {userRole === 'Transporter' && (
          <Transporter/>
        )}
        </>
  )
}

export default Dashboard