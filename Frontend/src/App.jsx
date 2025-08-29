import './App.css'
import HomePage from './components/Home/HomePage'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './components/PageNotFound'
import Signup from './components/user/Signup'
import Login from './components/user/Login'
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}></GoogleOAuthProvider>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/signup' element={< Signup />} />
        <Route path='/login' element={<Login />} />

      </Routes>
      <GoogleOAuthProvider />
    </>
  )
}

export default App
