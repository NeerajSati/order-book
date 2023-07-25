import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Manufacturer from './Manufacturer'
import Transporter from './Transporter'

function Dashboard() {
  const navigate = useNavigate()
  useEffect(()=>{
    const tokenStored = localStorage.getItem("auth-token")
    if(!tokenStored){
        toast.error("Please Login first...")
        navigate('/login')
    }
  },[])
  
  return (
        <Transporter/>
        // <Manufacturer/>
  )
}

export default Dashboard