import React from 'react'
import {ReactComponent as Logo} from "../assets/vectors/Vector.svg";


function Header() {
  return (
    <div className="header">
      <Logo className="Logo"></Logo>

      <div className="link_flexbox">

          <a href='/' className='headertext'>HOME</a>

          <a href='blog' className='headertext'>BLOG</a>

          <a href='about' className='headertext'>ABOUT</a>

          <a href='contact' className='headertext'>CONTACT</a>

      </div>
    </div>
  )
}

export default Header