import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../socket';
import toast from 'react-hot-toast';

function ReplyToOrderModal({setViewReplyToOrderModal, messageList}) {
    const [orderIds, setOrderIds] = useState([])
    const [price, setPrice] = useState("")
    const [Id, setId] = useState("")
    useEffect(()=>{
        const ids = [];
        messageList.forEach((el)=>{
            if(el?.data?.orderId){
                if(!ids.includes(el?.data?.orderId)){
                    ids.push(el?.data?.orderId);
                }
            }
        })
        setOrderIds(ids)
    },[messageList])

    const handleReply = async() =>{
        if(!Id || !price)
            return;

        const messageId = messageList.find((x)=>x.isReply === false && String(x?.data?.orderId) === String(Id))
        setViewReplyToOrderModal(false);
        socket.emit("reply_to_order",{
            orderId: Id, messageId: messageId._id, price
        })
        toast.success("Reply created!")
    }

  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto relative'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>Create a Reply</div>
        <div className='w-full font-semibold flex flex-col items-center justify-center'>
            <div className='py-2'>Select Order ID: 
                <select onChange={(e)=>{setId(e.target.value)}} className='ml-2 w-[150px] outline-none border-2 rounded-md border-gray-400'>
                    <option value="">choose</option>
                    {
                        orderIds && orderIds.map((id)=>{
                            return <option value={id} key={id}>{id}</option>
                        })
                    }
                </select>
            </div>
            <div className='py-2'>Price: 
                <input onChange={(e)=>{setPrice(e.target.value)}} className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Price'></input>
            </div>
        </div>
        
        <div className='w-full flex items-center justify-center mt-2'>
            <button onClick={handleReply} className='bg-[#09794A] text-white px-4 py-1 rounded-md'>Send Reply</button>
        </div>
        <div onClick={()=>{setViewReplyToOrderModal(false)}} className='absolute top-[20px] right-[20px] text-[25px] cursor-pointer text-[#861a1a]'>x</div>
    </div>
  )
}

export default ReplyToOrderModal