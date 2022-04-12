import Header from "./Header"
// import { useState } from 'react'



const Home = () => {
    
  return(
        <div style={imageStyle}>
            {/* <Header></Header> */}
            <p style={text} className="h1">Track all your packages in one secure app.</p>
            <p style={text} className="h5">Get the latest updates, extimated delivery date and more</p>
        </div> 
  )
};

const imageStyle = {
    height: '100vh',
    backgroundImage:  "URL('pattern.jpg')",
    backgroundSize:   'cover',
    backgroundPosition: 'left',
    zIndex: '0',
 
}

// const padding ={
//     height: '100vh',
//     paddingTop: "40vh",
//     paddingBottom: "40vh",
//     borderRadius: '8px',
//     border: '4px solid black',
//     margin: '3vh 6vh'
// }

const text = {
    margin: '0',
    padding: '15vh 20% 10vh 20%',
    zIndex: '1',
    color: "white",
    textAlign: 'center'
}



export default Home;
