import './App.css'
import HomePage from './components/Home/HomePage'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'
import Signup from './components/user/Signup'
import Login from './components/user/Login'
import Dashboard from './components/user/Dashboard'
import VideoPlaying from './components/Home/VideoPlaying'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  return (
    <>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/home' element={<HomePage user={user} />} />
        <Route path='/signup' element={< Signup setUser={setUser} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/dashboard' element={<Dashboard user={user}/>} />
        <Route path='/api/v1/video/get/:videoId' element={<VideoPlaying user={user}/>} />

      </Routes>
    </>
  )
}

export default App
