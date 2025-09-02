import './App.css'
import HomePage from './components/Home/HomePage'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'
import Signup from './components/user/Signup'
import Login from './components/user/Login'
import Dashboard from './components/user/Dashboard'
import VideoPlaying from './components/Home/VideoPlaying'

function App() {

  return (
    <>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/signup' element={< Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/videoPlaying' element={<VideoPlaying />} />

      </Routes>
    </>
  )
}

export default App
