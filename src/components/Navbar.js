import React from 'react'
import '../styling/Navbar.css'
const Navbar = ({setActiveView}) => {
  return (
    <nav className='nav-cont'>
        <h3 className='nav-h3'>Chattrix</h3>
        <div>
            <button className='btn btn-light' onClick={()=>setActiveView('register')}>Sign Up</button>
            <button className='btn btn-light nav-btn' onClick={()=>setActiveView('login')}>Sign In</button>
        </div>
    </nav>
  )
}

export default Navbar