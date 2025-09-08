import './App.css'
import HomePage from './components/Home/HomePage'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/utils/PageNotFound.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/user/Dashboard'
import VideoPlaying from './components/Home/VideoPlaying'
import Loader from './components/utils/Loader'
import { useState } from 'react'
import TweetsGrid from './components/Home/Tweets/TweetsGrid.jsx'
import CardGrid from './components/Home/Videos/CardGrid.jsx'
import LayoutWithNavbar from "./components/Home/LayoutWithNavbar.jsx"
import History from './components/user/History/History.jsx'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  return (
    <>
      <Routes>

        <Route path='*' element={<PageNotFound />} />

        <Route path='/signup' element={< Signup setUser={setUser} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />

        <Route element={<LayoutWithNavbar user={user} />} >
          <Route path='/home/videos' element={<CardGrid />} />
          <Route path='/home/tweets' element={<TweetsGrid />} />
        </Route>

        <Route element={<Dashboard user={user} />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/history' element={ <History/> } />
        </Route>
        <Route path='/api/v1/video/get/:videoId' element={<VideoPlaying user={user} />} />

      </Routes>
    </>
  )
}

export default App
