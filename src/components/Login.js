import React from 'react'
import "../styling/Login.css"
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../Api_Path'
import {useNavigate } from 'react-router-dom'

const Login = ({setActiveView}) => {
  const [data,setData]=useState({
    email:'',
    password:''
  })
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate=useNavigate();
  const changeHandle=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandle=async(e)=>{
    e.preventDefault();
    if(data.email){
      await axios.post(`${API_URL}/user/login`,data)
      .then(async(res)=>{
        localStorage.setItem('ownerid',res.data.exist._id)
        localStorage.setItem('token',res.data.token)
        setMessage(res.data.message || "Login Successful");
        setMessageType("success");
        setData({
          email:'',
          password:''
        })
        if(await res.data.exist.avatar===""){
          navigate("/profile")
        }
        else{
          navigate("/chat")
        }
      })
      .catch((err)=>{
        setMessage(err.response  || "Login Failed");
        setMessageType("error");
      })
    }
    
  }
  return (
    <div className='log-cont'>
        <h4 className='log-h4'>Sign In</h4>
        <form className='log-form' onSubmit={submitHandle}>
            <input className='log-input' type='email' name='email' value={data.email} placeholder='Email' required onChange={changeHandle} />
            <input className='log-input'  type='password' name='password' value={data.password} placeholder='Password' required onChange={changeHandle}  />
            {message && (
                <p className={`log-message ${messageType}`}>
                  {message}
                </p>
              )}
              <p className='reg-p'>Doesn't have an account ? <span onClick={()=>setActiveView('register')}>Register</span></p>
            <div className='button'><button type='submit' className='btn btn-primary'>Login</button></div>
        </form>
    </div>
  )
}

export default Login