const Home = () => {
    
  return(
        <div style={imageStyle}>
            <p style={text} className="h1">Track all your packages in one secure app.</p>
            <p style={text} className="h5">Get the latest updates, Package status and more</p>
        </div> 
  )
};

const imageStyle = {
    height: '100vh',
    backgroundImage:  "URL(https://res.cloudinary.com/dpivoqpxh/image/upload/v1650505815/pexels-tima-miroshnichenko-6169588_1_fukaev.jpg)",
    backgroundSize:   'cover',
    backgroundPosition: 'center',
    zIndex: '0',
    // height: '100vh',
    // backgroundImage:  "URL(https://res.cloudinary.com/dpivoqpxh/image/upload/v1650061448/icon_gmclb2.png)",
    // backgroundSize: 'repeat',
    // backgroundPosition: 'left',
    // zIndex: '0',
 
}

const text = {
    margin: '0',
    padding: '15vh 20% 10vh 20%',
    zIndex: '1',
    color: "white",
    textAlign: 'center'
}



export default Home;
