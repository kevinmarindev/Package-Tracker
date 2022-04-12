// import { useEffect } from 'react'
// import axios from 'axios'
import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'

const Auth = ({ children, sendTo }) => {
    const navigate = useNavigate()
    
   
       let authenticated = JSON.parse(sessionStorage.getItem('user'))
        console.log(authenticated)
        return authenticated ? children : <Navigate to={sendTo} />
        // <h1>Hey you are not supposed to be here</h1> 
   

    

    
        
    
    // const navigate = useNavigate()
    // let authenticated = sessionStorage.getItem('user')
    // console.log(authenticated)
    // return authenticated ? children : navigate('/')
}

export default Auth
