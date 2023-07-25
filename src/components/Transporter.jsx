import React, { useEffect, useState } from 'react'
import ReplyToOrderModal from './ReplyToOrderModal';
import OrderDetailsModal from './OrderDetailsModal';

function Transporter({messageList}) {
    const [filter, setFilter] = useState('orderId');
    const [viewReplyToOrderModal, setViewReplyToOrderModal] = useState(false);
    const [viewOrderDetailsModal, setViewOrderDetailsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({})
    const [searchMessages,setSearchMessages] = useState([])
    const [searchQuery,setSearchQuery] = useState("")
    useEffect(()=>{
        handleSearch();
    },[messageList])

    const handleSearch = () =>{
        if(searchQuery){
            if(filter === 'orderId'){
                const list = messageList.filter((m)=>{
                    console.log("ok",m)
                    return m?.data?.orderId && m.data.orderId.toString().includes(searchQuery)
                })
                setSearchMessages(list)
            }
            if(filter === 'from'){
                const list = messageList.filter((m)=>{
                    return m?.data?.from && m.data.from.toString().includes(searchQuery)
                })
                setSearchMessages(list)
            }
            if(filter === 'to'){
                const list = messageList.filter((m)=>{
                    return m?.data?.to && m.data.to.toString().includes(searchQuery)
                })
                setSearchMessages(list)
            }
        } else{
            setSearchMessages(messageList);
        }
    }

  return (
    <div className='h-screen'>
        <div className='h-[60px] bg-[rgb(177,177,177)]'>
            <div className='h-full flex items-center justify-center text-lg font-semibold'>
                Transporter Dashboard
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
            <div className='h-full flex flex-col justify-between border-2 rounded-md border-gray-500'>
                <div className='px-5 h-[calc(100%-60px)] pt-2 overflow-y-auto'>
                    {
                        searchMessages && searchMessages.map((message)=>{
                            return message.isReply ? (
                                <div key={message._id} className='flex flex-row items-center justify-end w-full mb-2'>
                                    <div className='text-left max-w-[50%] bg-[rgb(105,224,161)] rounded-lg p-3 cursor-pointer'>
                                        <span className='font-bold'>Order id:</span>{message.data?.orderId}<br/>
                                        <span className='font-bold'>Price:</span>{message.data?.price}<br/>
                                    </div>
                                </div>
                            ) : (
                                <div key={message._id} className='flex flex-row items-center justify-start w-full mb-2'>
                                    <div onClick={()=>{setSelectedOrder(message); setViewOrderDetailsModal(true)}} className='text-left max-w-[50%] bg-[rgb(103,172,255)] rounded-lg p-3 cursor-pointer'>
                                        <span className='font-bold'>Order id:</span> {message.data?.orderId}<br/>
                                        <span className='font-bold'>From:</span> {message.data?.from}<br/>
                                        <span className='font-bold'>To:</span> {message.data?.to}<br/>
                                        </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='w-full h-[60px] bg-[#1b1b1b] flex items-center justify-center'>
                    <button onClick={()=>{setViewReplyToOrderModal(true)}} className='flex flex-row items-center justify-center bg-[#fffcd1] px-3 py-1 rounded-md '><span className='w-5 h-5 mr-2 bg-green-400 flex items-center justify-center rounded-full pb-[5px] font-bold text-[20px]'>+</span> Reply</button>
                </div>
            </div>
        </div>
        {
            viewReplyToOrderModal && (
            <div onClick={()=>{setViewReplyToOrderModal(false)}} className='fixed top-0 right-0 left-0 bottom-0 w-screen h-screen bg-[#262626c1] flex items-center justify-center'>
                    <ReplyToOrderModal messageList={messageList} setViewReplyToOrderModal={setViewReplyToOrderModal}/>
            </div>)
        }
        {
            viewOrderDetailsModal && (
            <div onClick={()=>{setViewOrderDetailsModal(false)}} className='fixed top-0 right-0 left-0 bottom-0 w-screen h-screen bg-[#262626c1] flex items-center justify-center'>
                    <OrderDetailsModal selectedOrder={selectedOrder} canReply={true} setViewOrderDetailsModal={setViewOrderDetailsModal}/>
            </div>)
        }
    </div>
  )
}

export default Transporter