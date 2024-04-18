import React from 'react'
import {ReactComponent as Logo} from "../assets/vectors/Vector.svg";


const Footer = () => {
  return (
    <div className='footerwrapper'>

        <div className='footer_top'>
            <Logo className='footer_logo'></Logo>
            <div className='footer_menu'>
                <a href='/' className='headertext'>HOME</a>
                <a href='blog' className='headertext'>BLOG</a>
                <a href='about' className='headertext'>ABOUT</a>
                <a href='contact' className='headertext'>CONTACT</a>
            </div>
        </div>
        
        <div className='footer_bottom'>
            <div className='footer_links'>
                <a className='footer_link_text' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> Privacy Policy</a>
                <a className='footer_link_text' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> Terms & Conditions</a>
            </div>
            <p className='footer_year'>©{new Date().getFullYear()}</p>
        </div>
    </div>
  )
}

export default Footer