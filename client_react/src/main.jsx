import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './index.css'

import Login from "./pages/Login/Login"
import Errorpage from './pages/Errorpage/Errorpage'
import Register from './pages/Register/Register'
import Chat from './pages/Chat/Chat.jsx'
import Home from './pages/Home/Home.jsx'
import PrivateRoute from './pages/PrivateRoute/PrivateRoute.jsx'
import Profile from './pages/Profile/Profile.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registrieren" element={<Register />}/>
        <Route path="chat" element={
          <PrivateRoute loadingMessage="Chat wird geladen">
            <Chat/>
          </PrivateRoute>
        
        }/>
        <Route path="test" element={<PrivateRoute></PrivateRoute>}/>
        <Route path="profil" element={
          <PrivateRoute loadingMessage="Profil wird geladen"> 
            <Profile />
          </PrivateRoute>
        }/>
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)