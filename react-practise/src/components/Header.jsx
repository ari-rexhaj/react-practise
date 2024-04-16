import React from 'react'
import {ReactComponent as Logo} from "../assets/imgs/Vector.svg";


function Header() {
  return (
    <div className="header">
      <Logo className="Logo"></Logo>

      <div className="link_flexbox">

        <div className='headertext'>
          <a href='/'>HOME</a>
        </div>

        <div className='headertext'>
          <a href='blog'>BLOG</a>
        </div>

        <div className='headertext'>
          <a href='about'>ABOUT</a>
        </div>

        <div className='headertext'>
          <a href='contact'>CONTACT</a>
        </div>

      </div>
    </div>
  )
}

export default Header