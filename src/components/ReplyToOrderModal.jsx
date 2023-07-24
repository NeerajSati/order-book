import React, { useRef, useState } from 'react'

function ReplyToOrderModal({setViewReplyToOrderModal}) {
  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto relative'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>Create a Reply</div>
        <div className='w-full font-semibold flex flex-col items-center justify-center'>
            <div className='py-2'>Select Order ID: 
                <select className='ml-2 w-[150px] outline-none border-2 rounded-md border-gray-400'>
                    <option value="Order1">O1</option>
                    <option value="Order2">O2</option>
                </select>
            </div>
            <div className='py-2'>Price: 
                <input className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Price'></input>
            </div>
        </div>
        
        <div className='w-full flex items-center justify-center mt-2'>
            <button className='bg-[#09794A] text-white px-4 py-1 rounded-md'>Send Reply</button>
        </div>
        <div onClick={()=>{setViewReplyToOrderModal(false)}} className='absolute top-[20px] right-[20px] text-[25px] cursor-pointer text-[#861a1a]'>x</div>
    </div>
  )
}

export default ReplyToOrderModal