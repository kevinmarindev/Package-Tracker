// import { useEffect } from 'react'
// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Auth = ({ children, sendTo }) => {
    const navigate = useNavigate()
    let authenticated = sessionStorage.getItem('user')
    return authenticated ? children : navigate('/')
}

export default Auth
