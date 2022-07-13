import React from 'react'
import {Navigate} from 'react-router-dom'

const Auth2 = ({ children }) => {
  let authenticated = JSON.parse(sessionStorage.getItem('user'))
    console.log(authenticated)
    return !authenticated ? children : <Navigate to={'/in'} />
}

export default Auth2