import React from 'react'
import "../styling/ChatDashboard.css"
import AllContacts from '../components/AllContacts'
import ChatContainer from '../components/ChatContainer'
import Robot from "../assets/robot.gif"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { API_URL } from '../Api_Path'
const ChatDashboard = () => {
    const [activeView,setActiveView]=useState(null);
    const [ownerName,setOwnerName]=useState(null);
    const ownerid=localStorage.getItem('ownerid');
    const navigate=useNavigate();
    useEffect(()=>{
      if(ownerid){
        axios.get(`${API_URL}/user/indv/${ownerid}`)
        .then((res)=>setOwnerName(res.data.name))
        .catch((err)=>console.log(err.response))
      }
    },[ownerid])

    const logoutHandle=()=>{
      const confirm=window.confirm('Do you want to logout?')
      if(confirm){
        navigate('/')
      }
    }
  return (
    <div className='chat-main'>
        <div className='chat-cont'>
            <AllContacts setActiveView={setActiveView}/>
            {activeView!==null?
              <ChatContainer user={activeView}/>
              :
              <div className='welcome-cont'>
                <div className='welcome-i' onClick={logoutHandle} >
                  <i className='fa-solid fa-power-off fa-lg' style={{ color: '#e60a20' }}></i>
                </div>
                <img src={Robot} alt="Welcome User!"/>
                {ownerName&&<p className='welcome-p'>Welcome <span className='welcome-user'>{ownerName}</span></p>}
                <p className='welcome-p2'>Please select a chat to <b>Start</b> messaging.</p>
              </div>
            }
        </div>
    </div>
  )
}

export default ChatDashboard