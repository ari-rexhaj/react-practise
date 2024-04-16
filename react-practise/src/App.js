import React from 'react'
import { Route, Routes } from "react-router-dom";

import About from "./links/About.js"
import Blog from "./links/Blog.js"
import Contact from "./links/Contact.js"
import Home from "./links/Home.js"
import Privacy from "./links/Privacy.js"
import Terms from "./links/Terms.js"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/privacy_policy" element={<Privacy/>}/>
      <Route path="/terms_&_conditions" element={<Terms/>}/>
    </Routes>  
  )
}

export default App