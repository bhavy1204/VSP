import './App.css'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/utils/PageNotFound.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/user/Dashboard.jsx'
import VideoPlaying from './components/Home/VideoPlaying.jsx'
import { useState } from 'react'
import TweetsGrid from './components/Home/Tweets/TweetsGrid.jsx'
import CardGrid from './components/Home/Videos/CardGrid.jsx'
import LayoutWithNavbar from "./components/Home/LayoutWithNavbar.jsx"
import History from './components/user/History/History.jsx'
import UserVideo from './components/user/MyVideos/UserVideo.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './features/authSlice.js'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Routes>

        <Route path='*' element={<PageNotFound />} />

        <Route path='/signup' element={< Signup />} />
        <Route path='/login' element={<Login/>} />

        <Route element={<LayoutWithNavbar/>} >
          <Route path='/home/videos' element={<CardGrid />} />
          <Route path='/home/tweets' element={<TweetsGrid />} />
        </Route>

        <Route element={<Dashboard />} >
          {/* <Route index element={<UserVideo/>} /> */}
          <Route path='/dashboard/history' element={<History />} />
          <Route path='/dashboard/myvideo' element={<UserVideo />} />
        </Route>

        <Route path='/api/v1/video/get/:videoId' element={<VideoPlaying />} />

      </Routes>
    </>
  )
}

export default App
