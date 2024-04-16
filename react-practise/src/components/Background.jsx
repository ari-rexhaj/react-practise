import React from 'react'

const Background = () => {
  return (
    <div className='background'>
        <div className='herowrapper'>   {/*the entire box, containing everything in the middle of the home page*/}
            <div className='herotextcontainer'>   {/*the box containing the two top texts*/}
                <p className='smallherotext'>Your Best Value Proposition</p>
                <p className='bigherotext'>Explore Our Creative Agency & Get Inspired</p>
            </div>

            <div className='newsletterwrapper'>   {/*newspaper sign up thingy, does not need to work*/}
                <input className="heroinput"></input>
                <button className="herobutton">Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default Background