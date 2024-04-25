import React from 'react'

/*dont forget to make clickable later... please*/
const Blogpost = ({date,tag,title,imgurl}) => {
  
  if (imgurl === null || imgurl === "") {
    imgurl = "../assets/imgs/Image.png"
  }
  
  return (
    <div className='post'>
      <img src={imgurl} alt="invalid img url"></img>
      <div className="blogpost_content">
        <div className="blogpost_infowrapper">
          <p className='blogpost_metadata'>{date}</p>

          <svg className='blogdot' width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" fill="#0094FF"/>
          </svg>

          <p className='blogpost_metadata'>{tag}</p>
        </div>
      <p className='blogpost_title'>{title}</p>
      </div>
    </div>
  )
}

export default Blogpost