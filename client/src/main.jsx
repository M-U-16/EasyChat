import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import App from './App/App'
import Login from "./pages/Login/Login"
import Errorpage from './pages/Errorpage/Errorpage'
import Register from './pages/Register/Register'
import Chat from './pages/Chat/Chat.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "registrieren",
    element: <Register />
  },
  {
    path: "chat",
    element: <Chat />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="registrieren" element={<Register />}/>
        <Route path="chat" element={<Chat />}/>
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

/* 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />}/>
    </Routes>
  </BrowserRouter>
*/
