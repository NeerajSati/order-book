import React, { useRef, useState } from 'react'

function CreateOrderModal({setViewCreateGroupModal}) {
  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto relative'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>Create a Order</div>
        <div className='w-full font-semibold flex flex-col items-center justify-center'>
            <div className='py-2'>Enter Order ID: 
                <input className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Order ID'></input>
            </div>
            <div className='py-2'>From: 
                <input className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Address'></input>
            </div>
            <div className='py-2'>To: 
                <input className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Address'></input>
            </div>
            <div className='py-2'>Quantity: 
                <input className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Quantity e.g,50,100,...'></input>
            </div>
            <div className='py-2'>Pickup: 
                <input className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Address'></input>
            </div>
            <div className='py-2'>Transporter: 
            <select className='ml-2 w-[150px] outline-none border-2 rounded-md border-gray-400'>
                <option value="Someone">T1</option>
                <option value="Transporter2">T2</option>
            </select>
            </div>
        </div>
        
        <div className='w-full flex items-center justify-center mt-2'>
            <button className='bg-[#09794A] text-white px-4 py-1 rounded-md'>Create Order</button>
        </div>
        <div onClick={()=>{setViewCreateGroupModal(false)}} className='absolute top-[20px] right-[20px] text-[25px] cursor-pointer text-[#861a1a]'>x</div>
    </div>
  )
}

export default CreateOrderModal