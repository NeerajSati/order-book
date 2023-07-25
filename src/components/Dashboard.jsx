import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Manufacturer from './Manufacturer'
import Transporter from './Transporter'
import { socket } from '../socket';
import axios from 'axios';

function Dashboard() {
  const [userRole, setUserRole] = useState("")
  const [messageList, setMessageList] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    const tokenStored = localStorage.getItem("auth-token")
    if(!tokenStored){
        toast.error("Please Login first...")
        navigate('/login')
    } else{
      socket.auth.token = tokenStored;
      socket.connect();
      socket.on('connect', function () {
        console.log("Socket connect!")
      });
      socket.on('order_sent', function (message) {
        setMessageList((list)=>[...list,{_id: message._id, isReply: false,data:message.data}])
      });
      socket.on('order_received', function (message) {
        setMessageList((list)=>[...list,{_id: message._id, isReply: false,data:message.data}])
      });
      socket.on('order_reply_received', function (message) {
        setMessageList((list)=>[...list,{_id: message._id, isReply: true,data:message.data}])
      });
      socket.on('order_reply_sent', function (message) {
        setMessageList((list)=>[...list,{_id: message._id, isReply: true,data:message.data}])
      });
    }
    const tokenDetailsStored = localStorage.getItem("auth-token-data")
    if(tokenDetailsStored){
      const data = JSON.parse(tokenDetailsStored)
      setUserRole(data.role)
      getMessages()
    }
  },[])

  const getMessages = async() => {
    const tokenStored = JSON.parse(localStorage.getItem("auth-token"))
    const messages = await axios.get(process.env.REACT_APP_API_BASE+"/api/message/all",{
        headers:{
            "authorization": `Bearer ${tokenStored}`
        }
    })
    setMessageList(messages.data.data)
  }
  
  return (
        <>
        {userRole === 'Manufacturer' && (
          <Manufacturer messageList={messageList}/>
        )}
        {userRole === 'Transporter' && (
          <Transporter messageList={messageList}/>
        )}
        </>
  )
}

export default Dashboard