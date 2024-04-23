import React from 'react'
import Header from "../components/Header.jsx";
import Background from '../components/Background.jsx';
import Blogpost from '../components/Blogpost.jsx';
import Footer from '../components/Footer.jsx';
import {useState, useEffect} from "react"

let allPosts_metadata = [  //this data will probably get called from the backend later 
["23 January 2024","creative","It was the scarcity that fueled his creativity"],
["23 January 2024","development","Development is work, I like listening to music while I do it! Especially from software soundtracks! Read more here!"],
["23 January 2024","marketing","origin3 is the hip new marketing agency!!"],
["23 January 2024","creative","It was the scarcity that fueled his creativity"],
["21 January 2024","development","Development is hard work, I barely know what im doing! But It's pretty fun! Read more here!"],
["25 January 2024","development","Development is easy work, I definitively know what im doing! But it sucks! Read more here!"],
["22 January 2024","development","Development is confusing work, I read more than I code! But It's interesting! Read more here!"],
["24 January 2024","development","Development is intuitive work, I code more than I read! But It's boring! Read more here!"],
["23 January 2024","marketing","wait, is this ACTUALLY WORKING??????"],
["23 January 2024","marketing","if you are only seeing one of this blog, THEN YES!!!!"]
]

let APIallPost_metadata = fetch('http://localhost:3001/getPosts', {
  method:'GET'
})
.then(response => {
  if(!response.ok) {
    throw new Error("network response NO GOOD")
  }
  else{
    return response.json();
  }
})
.then(data => {
  return data
})

console.log(APIallPost_metadata)

const Home = () => {
  const [filterValue, Setfilter] = useState("all");
  
  useEffect(() => {
    Setfilter(filterValue)
    
  },[filterValue])  

  return (
    <div>
      <Header/>
      <Background/>
      <div className='section'>
      <div className='content'>
        <p className='blogtitle'>All Blog Posts</p>
        <div className='filtercontainer'>
          <p className='filteroptions' onClick={() => Setfilter("all")}>Show All</p> {/*will make the filteroptions clickable later*/}
          <p className='filteroptions' onClick={() => Setfilter("creative")}>Creative</p>
          <p className='filteroptions' onClick={() => Setfilter("development")}>Development</p>
          <p className='filteroptions' onClick={() => Setfilter("marketing")}>Marketing</p>
        </div>
      </div>
      <div className='posts' id='posts'> {/*hard coded rn so i could make the design match, will make it take a list of blog posts and distribute them correctly later*/}
        {postgenerator(allPosts_metadata,filterValue)}
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default Home

//tl:dr; takes a list of metadata, and returns a list of only components that match the filter parameter, unless the filter parameter = "all"
function postgenerator(metadatalist, filter) { 
  //if you dont understand the code, let me break it down. Click the link below for starters
  //https://www.lovethispic.com/uploaded_images/38069-Breakdance-Spin-Gif.gif
  
  if (filter !== "all") {
    metadatalist = metadatalist.filter((metadata) => metadata[1] === filter)
  }
  const componentList = metadatalist.map((metadata) => <Blogpost date={metadata[0]} tag={metadata[1]} title={metadata[2]} />)
  let rowList = [];
  for (let i = 0; i < Math.ceil(metadatalist.length/3); i++) {

    let rowItems = [];  
    for (let i = 0; i < 3; i++) {
      rowItems.push(componentList.pop())
    }

    rowList.push(<div className="row">{rowItems}</div>);
  }
  return rowList
}

function newpostgenerator(metdatalist,filter) {
  //this one will use the API
}