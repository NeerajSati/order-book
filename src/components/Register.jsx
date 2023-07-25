import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import jwt_decode from "jwt-decode";

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("Manufacturer");
    useEffect(()=>{
        const tokenStored = localStorage.getItem("auth-token")
        if(tokenStored){
            toast.success("Already Logged in...")
            navigate('/')
        }
    },[])
    const handleRegister = async() =>{
        try{
            const registerUser = await axios.post(process.env.REACT_APP_API_BASE+"/api/auth/register",{
                email, password, name, address, role
            })
            localStorage.setItem("auth-token",JSON.stringify(registerUser.data.token))
            const decodedToken = jwt_decode(registerUser.data.token);
            localStorage.setItem("auth-token",JSON.stringify(registerUser.data.token))
            localStorage.setItem("auth-token-data",JSON.stringify(decodedToken))
            toast.success("Registered! Logging you in...")
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
        <div className='bg-[#ffdcdc] flex items-center justify-center min-h-screen'>
            <div className='bg-white py-7 px-10 flex flex-col items-center justify-center max-sm:w-full max-sm:px-5'>
                <div className='text-[25px] max-sm:text-[20px]'>Register</div>
                <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                    <div className='text-[14px]'>Email</div>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
                </div>
                <div className='mt-5 flex flex-col items-start justify-start relative max-sm:w-full'>
                    <div className='text-[14px]'>Password</div>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
                </div>
                <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                    <div className='text-[14px]'>Name</div>
                    <input onChange={(e)=>{setName(e.target.value)}} className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
                </div>
                <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                    <div className='text-[14px]'>Address</div>
                    <input onChange={(e)=>{setAddress(e.target.value)}} className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
                </div>
                <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                    <div className='text-[14px]'>Register as</div>
                    <select onChange={(e)=>{setRole(e.target.value)}} className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Transporter">Transporter</option>
                    </select>
                </div>
                <button onClick={handleRegister} className='w-full rounded-sm mt-5 py-2 px-2 bg-[#c1c1ff] text-black'>Register</button>
                <Link to="/login" className='cursor-pointer mt-5 text-[blue]'>Want to log in?</Link>
            </div>
        </div>
  )
}

export default Register