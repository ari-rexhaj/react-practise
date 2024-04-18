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
  
  //this function works by taking a list of metadata and using it to generate the components
  //once the components are finished we pack them in a list and return them. Making it very easy
  //to implement the entire wall of posts, basically anywhere you would like

  //check if the filter is set to all, if not, we filter it and save it on the same variable.
  //The reason we save it on the same variable is because this makes it so that if the list does 
  //not need to be filtered, we can just continue with the inputed list, as that list has all 
  //the blogpost metadata already
  if (filter !== "all") {
    metadatalist = metadatalist.filter((metadata) => metadata[1] === filter)
  }
  
  //here we create the components and use the information from the metadata. Since this is a test
  //we only have date, tag and title. But for a real project this method would work for any data
  //you would like to implement into a component, so long as the component is configured to use
  //the data (which it obviously would be)
  const componentList = metadatalist.map((metadata) => <Blogpost date={metadata[0]} tag={metadata[1]} title={metadata[2]} />)
  
  //here we create an outerloop where we create the rows that the blogposts will sit inside
  //we do some math here to figure out how many rows we need. It is made so that if you have
  //for example 3 blogposts, it will only generate 1 row, but if you have 4 blogposts, it will 
  //generate 2 rows. This is to gurantee that the blogposts do not overflow off the screen
  let rowList = [];
  for (let i = 0; i < Math.ceil(metadatalist.length/3); i++) {

    //here we have an innerloop where we push in 3 blogposts into a list called RowItems. This
    //list is later pushed into the list rowList, in short this is for correctly layering the
    //blogposts into the rows. When we push a blogpost into rowItems, we use the .pop() method
    //as this removes the blogpost aquired from the componentList, this means we gurantee that 
    //we do not accidently push the same blogpost twice.
    let rowItems = [];  
    for (let i = 0; i < 3; i++) {
      rowItems.push(componentList.pop())
    }

    //here we push the rowItems list into a row, which we then push into the rowList list
    rowList.push(<div className="row">{rowItems}</div>);
  }
  //finally, after all the parsing and structuring is done, we return the rowList, which is ready
  //to be placed anywhere in a react function
  return rowList
}