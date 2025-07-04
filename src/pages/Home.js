import React from 'react'
import Navbar from '../components/Navbar'
import Register from '../components/Register'
import Login from '../components/Login'
import { useState,useEffect } from 'react'
import image from "../assets/talking-1988.gif"
import '../styling/Home.css'
const Home = () => {
    const [activeView,setActiveView]=useState(null);
    useEffect(()=>{
      localStorage.clear();
    },[])
  return (
    <div className='home-cont'>
        <Navbar setActiveView={setActiveView}/>
        {activeView==='register' && <Register setActiveView={setActiveView}/>}
        {activeView==='login' && <Login setActiveView={setActiveView}/>}
        {!activeView && (
          <section className='home-hero'>
            <h1 className='home-title'>Welcome to <span>Chattrix</span> — Connect Beyond Limits</h1>
            <p className='home-subtitle'>Your conversations, reimagined.</p>
            <img className='home-image' src={image} alt='Home-Image'/>
            <ul className='home-features'>
              <li>🔒 <strong>End-to-End Privacy:</strong> Your chats are yours. We don't read, or share them.</li>
              <li>⚡ <strong>Real-Time Sync:</strong> Chat with zero delay — across all your devices.</li>
              <li>🌐 <strong>Global Reach:</strong> Connect with anyone, anywhere, anytime.</li>
              <li>🎨 <strong>Custom Avatars & Emojis:</strong> Make every message yours.</li>
            </ul>

            <p className='home-cta'>Fast. Friendly. Future-ready. Join the chat revolution today.</p>

            <div className='home-buttons'>
              <button onClick={() => setActiveView('register')}>Create an Account</button>
              <button onClick={() => setActiveView('login')}>Login</button>
            </div>
          </section>
        )}

    </div>
  )
}

export default Home