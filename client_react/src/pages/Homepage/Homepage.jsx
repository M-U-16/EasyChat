import React from "react"
import "./Homepage.css"
import { Header, About } from "../../containers"

const Homepage = () => {
  return (
    <main className="app__homepage">
      <Header />
      <About />
    </main>
  )
}

export default Homepage
