import React, { useState } from 'react'

function Manufacturer() {
    const [filter, setFilter] = useState('orderId');
  return (
    <div className='h-screen'>
        <div className='h-[60px] bg-[#c8d9d8]'>
            <div className='h-full flex items-center justify-center text-lg font-semibold'>
                Manufacturer Dashboard
            </div>
        </div>
        <div className='pt-4 h-[60px] flex items-center px-5 text-[16px]'>
            Search: 
            <select onChange={(e)=>{setFilter(e.target.value)}} className='ml-2 outline-none border-2 rounded-md border-gray-400'>
                <option value="orderId">Order Id</option>
                <option value="from">From</option>
                <option value="to">To</option>

            </select>
            <input type='text' placeholder={filter === 'orderId' ? 'Order id' : 'Address'} className='ml-3 w-[200px] border-gray-500 outline-none border-2 rounded-md px-2'/>
            <button className='bg-blue-500 rounded-md text-[16px] px-2 ml-3 text-white w-50px'>Search</button>
        </div>
        <div className='px-5 pt-2 font-bold text-[18px]'>Messages:</div>
        <div className='px-5 pt-2 h-[calc(100vh-160px)]'>
            <div className='px-5 h-full flex flex-col border-2 rounded-md border-gray-500 overflow-y-auto'>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-start w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-start w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-start w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-start w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
                <div className='flex flex-row items-center justify-start w-full mb-2'>
                    <div className='text-right max-w-[50%] bg-red-400 rounded-lg p-3 cursor-pointer'><span className='font-bold'>Order id:</span> 828282</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Manufacturer