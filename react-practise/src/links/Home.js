import React from 'react'
import Header from "../components/Header.jsx";
import Background from '../components/Background.jsx';
import Blogpost from '../components/Blogpost.jsx';
import Footer from '../components/Footer.jsx';
import {useState, useEffect} from "react"
import axios from 'axios'

let backend = "http://localhost:3002"

const Home = () => {
  const [filterValue, Setfilter] = useState("all");
  
  useEffect(() => {
    Setfilter(filterValue)
  },[filterValue])  
  
  const [postData,setPosts] = useState();
  useEffect(() => {
    
  if(filterValue === "all"){
    axios.get(backend+'/getPosts')
      .then((response) => {
        setPosts(response.data)
        console.log("getPosts success")
      })
      .catch((error) => {
        console.error("axios failed to fetch getPosts\n",error)
      })
    
    }
  else {
    axios.get(backend+`/getSpecificPosts/tag/${filterValue}`)
      .then((response) => {
        setPosts(response.data)
        console.log("getSpecificPosts success")
      })
      .catch((error) => {
        console.error("axios failed to fetch getSpecificPosts\n",error)
      })
  }
    
  },[filterValue]);

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
      <div className='posts' id='posts'> 
       <div className='row'>
       {
        postData?.map((data) =>(
          <Blogpost date={data?.date} tag={data?.tag} title={data?.title} imgurl={data?.thumbnail} key={data?.id}/>
        ))
       }
       </div>
      
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default Home

//tl:dr; takes a list of metadata, and returns a list of only components that match the filter parameter, unless the filter parameter = "all"

// function postgenerator(data,filter) {
//   //this one will use the API
//   console.log(data)
//   return Map<Blogpost date={data[0]["date"]} tag={data[0]["tag"]} title={data[0]}></Blogpost>
// }