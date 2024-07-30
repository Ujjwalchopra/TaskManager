import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { User } from "./Components/User"
import { Home } from "./Components/Home"
import React from "react"

function App() {
  return (
    
    <Router>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/userpage" element= {<User/>}/>
          
        </Routes>
    </Router>
    
  )
}

export default App
