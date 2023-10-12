import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import App from './App.jsx'
import Login from "./pages/Login/Login"
import Errorpage from './pages/Errorpage/Errorpage'
import Register from './pages/Register/Register'
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
