import React from 'react'

const Blogpost = (date,tag,title) => {
  return (
    <div className='post'>
        <img src="../assets/imgs/Image.png" alt="where the img at doe"></img>
        <div className="content">
            <div className="blog_infowrapper">
                <p>{date}</p>

                <svg className='blogdot' width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="3" fill="#0094FF"/>
                </svg>

                <p>{tag}</p>
            </div>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default Blogpost