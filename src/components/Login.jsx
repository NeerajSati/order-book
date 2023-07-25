import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import jwt_decode from "jwt-decode";

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    const tokenStored = localStorage.getItem("auth-token")
    if(tokenStored){
        toast.error("Already Logged in...")
        navigate('/')
    }
  },[])

  const handleLogin = async() =>{
    try{
        const loginUser = await axios.post(process.env.REACT_APP_API_BASE+"/api/auth/login",{
            email, password
        })
        const decodedToken = jwt_decode(loginUser.data.token);
        localStorage.setItem("auth-token",JSON.stringify(loginUser.data.token))
        localStorage.setItem("auth-token-data",JSON.stringify(decodedToken))
        toast.success("Logged in!")
        navigate('/')
    } catch(err){
        if(err?.response?.data?.msg){
            toast.error(err?.response?.data?.msg)
        }else{
            toast.error("Something went wrong!")
        }
    }
}

  return (
    <div className='bg-[#ffdcdc] flex items-center justify-center h-screen'>
        <div className='bg-white py-7 px-10 flex flex-col items-center justify-center max-sm:w-full max-sm:px-5'>
            <div className='text-[25px] max-sm:text-[20px]'>Login</div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Email</div>
                <input onChange={(e)=>{setEmail(e.target.value)}} className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start relative max-sm:w-full'>
                <div className='text-[14px]'>Password</div>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
            </div>
            <button onClick={handleLogin} className='w-full rounded-sm mt-5 py-2 px-2 bg-[#c1c1ff] text-black'>Log In</button>
            <Link to="/register" className='cursor-pointer mt-5 text-[blue]'>Do not have an account? Register</Link>
        </div>
    </div>
  )
}

export default Login