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
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './features/authSlice.js'
import MyVideos from './components/user/MyVideos/MyVideos.jsx'
import UploadVideos from './components/user/upload/UploadVideos.jsx'
import { UserChannel } from './components/user/UserChannel.jsx'
import MyPosts from './components/user/posts/MyPosts.jsx'
import { Toaster } from 'react-hot-toast'
import SubscribeTo from './components/user/subscribedTo/SubscribeTo.jsx'
import MyLikedVideo from './components/user/liked/videos/MyLikedVideo.jsx'
import MyLikedPost from './components/user/liked/posts/MyLikedPost.jsx'
import Playlist from './components/user/playlist/Playlist.jsx'
import PlaylistVideoContainer from './components/user/playlist/PlaylistVideoContainer.jsx'
import SearchResults from './components/Home/SearchResults.jsx'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

        <Route path='*' element={<PageNotFound />} />

        <Route path='/signup' element={< Signup />} />
        <Route path='/login' element={<Login />} />

        <Route element={<LayoutWithNavbar />} >
          <Route path='/home/videos' element={<CardGrid />} />
          <Route path='/home/tweets' element={<TweetsGrid />} />
          <Route path='/home/search' element={<SearchResults />} />
        </Route>

        <Route path='/dashboard' element={<Dashboard />} >
          {/* <Route index element={<UserVideo/>} /> */}
          <Route path='user' element={<UserChannel />} />
          <Route path='history' element={<History />} />
          <Route path='myVideos' element={<MyVideos />} />
          <Route path='upload' element={<UploadVideos />} />
          <Route path='myPosts' element={<MyPosts />} />
          <Route path='mySubscription' element={<SubscribeTo />} />
          <Route path='myLikedVideos' element={<MyLikedVideo />} />
          <Route path='myLikedPosts' element={<MyLikedPost />} />
          <Route path='myPlaylist' element={<Playlist />} />

          <Route path='myPlaylist/playlist/:playlistId' element={<PlaylistVideoContainer />} />
          {/* <Route path='myLikedPosts' element={<SubscribeTo />} /> */}
        </Route>

        <Route path='video/:videoId' element={<VideoPlaying />} />

      </Routes>
    </>
  )
}

export default App
