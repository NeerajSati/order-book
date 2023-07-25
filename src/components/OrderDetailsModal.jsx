import React, { useRef, useState } from 'react'

function OrderDetailsModal({setViewOrderDetailsModal, selectedOrder, canReply}) {
    console.log(selectedOrder)
  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto relative'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>Order Details!</div>
        <div className='w-full font-bold grid grid-cols-2'>
            <div className='text-right pr-5'>Order Id: </div>
            <div className='text-left font-semibold'>{selectedOrder.data.orderId}</div>
            <div className='text-right pr-5'>From: </div>
            <div className='text-left font-semibold'>{selectedOrder.data.from}</div>
            <div className='text-right pr-5'>To: </div>
            <div className='text-left font-semibold'>{selectedOrder.data.to}</div>
            <div className='text-right pr-5'>Quantity</div>
            <div className='text-left font-semibold'>{selectedOrder.data.quantity}</div>
            <div className='text-right pr-5'>Pickup:</div>
            <div className='text-left font-semibold'>{selectedOrder.data.pickup}</div>
            <div className='text-right pr-5'>Transporter:</div>
            <div className='text-left font-semibold'>{selectedOrder.data.transporterEmail}</div>
        </div>
        {
            canReply && (
                <>
                    <div className='font-bold mt-5'>Send Reply:</div>
                    <div className='w-full flex items-center justify-center mt-2'>
                        Price: <input className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='600'></input>
                    </div>
                    <div className='w-full flex items-center justify-center mt-5'>
                        <button className='bg-[#09794A] text-white px-4 py-1 rounded-md'>Send Reply</button>
                    </div>
                </>
            )
        }
        <div onClick={()=>{setViewOrderDetailsModal(false)}} className='absolute top-[10px] right-[20px] text-[25px] cursor-pointer text-[#861a1a]'>x</div>
    </div>
  )
}

export default OrderDetailsModal