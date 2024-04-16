import React from 'react'
import { Route, Routes } from "react-router-dom";

import About from "./links/About.js"
import Blog from "./links/Blog.js"
import Contact from "./links/Contact.js"
import Home from "./links/Home.js"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>  
  )
}

export default App