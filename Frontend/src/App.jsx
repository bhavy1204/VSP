import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUser } from './features/authSlice.js'

// Components
import PageNotFound from './components/utils/PageNotFound.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/user/Dashboard.jsx'
import VideoPlaying from './components/Home/VideoPlaying.jsx'
import TweetsGrid from './components/Home/Tweets/TweetsGrid.jsx'
import CardGrid from './components/Home/Videos/CardGrid.jsx'
import LayoutWithNavbar from "./components/Home/LayoutWithNavbar.jsx"
import History from './components/user/History/History.jsx'
import MyVideos from './components/user/MyVideos/MyVideos.jsx'
import UploadVideos from './components/user/upload/UploadVideos.jsx'
import { UserChannel } from './components/user/UserChannel.jsx'
import MyPosts from './components/user/posts/MyPosts.jsx'
import SubscribeTo from './components/user/subscribedTo/SubscribeTo.jsx'
import MyLikedVideo from './components/user/liked/videos/MyLikedVideo.jsx'
import MyLikedPost from './components/user/liked/posts/MyLikedPost.jsx'
import Playlist from './components/user/playlist/Playlist.jsx'
import PlaylistVideoContainer from './components/user/playlist/PlaylistVideoContainer.jsx'
import SearchResults from './components/Home/SearchResults.jsx'
import { Toaster } from 'react-hot-toast'

// Protected Route wrapper
import { Navigate } from 'react-router-dom'
import ComingSoon from './components/utils/ComingSoon.jsx'

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  console.log("THIS IS USER >> ", user)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const dispatch = useDispatch()

  // Fetch user on app load, but ignore failure (guest mode)
  useEffect(() => {
    dispatch(fetchUser())
      .unwrap()
      .catch(() => {
        // Guest mode, no action needed
      })
  }, [dispatch])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

        {/* Catch-all for 404 */}
        <Route path='*' element={<PageNotFound />} />

        {/* Auth routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {/* Public routes with navbar */}
        <Route element={<LayoutWithNavbar />} >
          <Route path='/' element={<CardGrid />} />
          <Route path='/home/videos' element={<CardGrid />} />
          <Route path='/home/tweets' element={<TweetsGrid />} />
          <Route path='/home/search' element={<SearchResults />} />
        </Route>

        {/* Dashboard and protected routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
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
        </Route>

        {/* Video playing route (public) */}
        <Route path='/video/:videoId' element={<VideoPlaying />} />
        <Route path='/under-devlopment' element={<ComingSoon />} />

      </Routes>
    </>
  )
}

export default App
