import React from 'react'
import Home from './pages/Home'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Avatar from './pages/Avatar'
import ChatDashboard from './pages/ChatDashboard'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Home/>}/>
      <Route path='/profile' exact element={<Avatar/>}/>
      <Route path='/chat' exact element={<ChatDashboard/>}/>
      <Route path='/*' exact element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App