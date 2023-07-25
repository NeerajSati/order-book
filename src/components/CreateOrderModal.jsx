import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../socket';
import axios from 'axios'
import toast from 'react-hot-toast';

function CreateOrderModal({setViewCreateOrderModal}) {
    const [orderId, setOrderId] = useState(Date.now());
    const [fromAddress, setFromAddress] = useState("");
    const [toAddress, setToAddress] = useState("");
    const [quantity, setQuantity] = useState("");
    const [pickup, setPickup] = useState("");
    const [transporter, setTransporter] = useState("");
    const [transporterList, setTransporterList] = useState([]);

    useEffect(()=>{
        const userDetails = JSON.parse(localStorage.getItem("auth-token-data"));
        setPickup(userDetails.address)
        getTransporters();
    },[])

    const getTransporters = async() => {
        const tokenStored = JSON.parse(localStorage.getItem("auth-token"))
        const transporters = await axios.get(process.env.REACT_APP_API_BASE+"/api/transporter/list",{
            headers:{
                "authorization": `Bearer ${tokenStored}`
            }
        })
        setTransporterList(transporters.data.data)
    }

    const handleSubmit = () => {
        if(!orderId || !toAddress || !fromAddress || !pickup || !transporter || !quantity){
            toast.error("Enter all details!")
            return;
        }
        toast.success("Order created!")
        setViewCreateOrderModal(false)
        const transporterId = transporterList.find((x)=>x.email === transporter)
        socket.emit("create_order",{
            from: fromAddress, to: toAddress, pickup, transporterEmail: transporter, transporterId: transporterId._id, quantity, orderId
        })
    }

  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto relative'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>Create a Order</div>
        <div className='w-full font-semibold flex flex-col items-center justify-center'>
            <div className='py-2'>Enter Order ID: 
                <input value={orderId} onChange={(e)=>{setOrderId(e.target.value)}} className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Order ID'></input>
            </div>
            <div className='py-2'>From: 
                <input onChange={(e)=>{setFromAddress(e.target.value)}} className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Address'></input>
            </div>
            <div className='py-2'>To: 
                <input onChange={(e)=>{setToAddress(e.target.value)}} className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Address'></input>
            </div>
            <div className='py-2'>Quantity: 
                <input onChange={(e)=>{setQuantity(e.target.value)}} className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Quantity e.g,50,100,...'></input>
            </div>
            <div className='py-2'>Pickup: 
                <input value={pickup} onChange={(e)=>{setPickup(e.target.value)}} className='ml-5 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Address'></input>
            </div>
            <div className='py-2'>Transporter: 
            <select onChange={(e)=>{setTransporter(e.target.value)}} className='ml-2 w-[150px] outline-none border-2 rounded-md border-gray-400'>
                <option value="">Choose</option>
                {
                    transporterList && transporterList.map((el)=>{
                        return <option key={el._id} value={el.email}>{el.email}</option>
                    })
                }
            </select>
            </div>
        </div>
        
        <div className='w-full flex items-center justify-center mt-2'>
            <button onClick={handleSubmit} className='bg-[#09794A] text-white px-4 py-1 rounded-md'>Create Order</button>
        </div>
        <div onClick={()=>{setViewCreateOrderModal(false)}} className='absolute top-[20px] right-[20px] text-[25px] cursor-pointer text-[#861a1a]'>x</div>
    </div>
  )
}

export default CreateOrderModal