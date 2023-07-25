import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Login() {

  return (
    <div className='bg-[#ffdcdc] flex items-center justify-center h-screen'>
        <div className='bg-white py-7 px-10 flex flex-col items-center justify-center max-sm:w-full max-sm:px-5'>
            <div className='text-[25px] max-sm:text-[20px]'>Login</div>
            <div className='mt-5 flex flex-col items-start justify-start max-sm:w-full'>
                <div className='text-[14px]'>Email</div>
                <input className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
            </div>
            <div className='mt-5 flex flex-col items-start justify-start relative max-sm:w-full'>
                <div className='text-[14px]'>Password</div>
                <input type="password" className='rounded-md mt-2 py-3 pr-10 px-5 border-2 border-black w-[450px] max-sm:w-full'/>
            </div>
            <button className='w-full rounded-sm mt-5 py-2 px-2 bg-[#c1c1ff] text-black'>Log In</button>
            <Link to="/register" className='cursor-pointer mt-5 text-[blue]'>Do not have an account? Register</Link>
        </div>
    </div>
  )
}

export default Login