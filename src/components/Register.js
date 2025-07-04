import React from 'react'
import '../styling/Register.css'
import { useState } from 'react'
import { API_URL } from '../Api_Path'
import axios from 'axios'
const Register = ({setActiveView}) => {
  const [data,setData]=useState({
    name:'',
    email:'',
    number:'',
    password:'',
    confpassword:''
  })
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const changeHandle=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const {password,confpassword}=data;
  const submitHandle = (e) => {
    e.preventDefault();
    if (data.email && password===confpassword) {
      axios.post(`${API_URL}/user/register`, data)
        .then((res) => {
          setMessage(res.data.message || "Registration Successful");
          setMessageType("success");
          setActiveView('login')
          setData({
            name: '',
            email: '',
            number: '',
            password: '',
            confpassword: ''
          });

        })
        .catch((err) => {
          setMessage(err.response?.data || "Registration Failed");
          setMessageType("error");
        });
    }
    if(password!==confpassword){
      setMessage("Password & Confirm password should be same");
      setMessageType("error");
    }
  };
  return (
    <div className='reg-cont'>
        <h4 className='reg-h4'>Registration</h4>
        <form className='form' onSubmit={submitHandle}>
            <input className='reg-input' type='text' name='name' value={data.name} placeholder='Username' required onChange={changeHandle}/>
            <input className='reg-input' type='email' name='email' value={data.email} placeholder='Email' required onChange={changeHandle}/>
            <input className='reg-input' type='text'  name='number' value={data.number} maxLength='10' placeholder='Mobile number' required onChange={changeHandle}/>
            <input className='reg-input' type='password' name='password' value={data.password} placeholder='Password' required onChange={changeHandle}/>
            <input className='reg-input' type='password' name='confpassword' value={data.confpassword} placeholder='Confirm Password' required onChange={changeHandle} />
            {message && (
                <p className={`reg-message ${messageType}`}>
                  {message}
                </p>
              )}
              <p className='reg-p'>Already have an account ? <span onClick={()=>setActiveView('login')}>Login</span></p>
            <div className='button'><button className='btn btn-primary' type='submit'>Register</button></div>
        </form>
    </div>
  )
}
export default Register