import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';



const Header = () => {
    const location = useLocation()
    let path = location.pathname
    let navigate = useNavigate()

    const logOut = async (e) => {
        if(path === '/in' || path === '/addnum') {
        console.log('loggin out')
        let res = await axios.post('/logout', {
        },{withCredentials: true})
        console.log(res)
        sessionStorage.clear()
        navigate('/')
    }
    }
    return (
        <Navbar  bg='dark' expand="md" className='border-bottom border-secondary text-light'>
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={ nav }>
                        <Link style={shadow}className='my-1 text-light' to={path === '/in' ? '/addnum' : path === '/addnum' ? '/in' : '/login'}>{path === '/in' ? 'Add Tracking' : path === '/addnum' ? 'My Items' : 'Sign In'}
                        </Link>
                        <Link style={shadow}className='my-1 text-light' to={path === '/in' ? '/' : path === '/addnum' ? '/' : 'Register'} onClick={logOut}>
                                {path === '/in' || path === '/addnum' ? 'Log Out' : 'Register'}
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
    )
}

//Styling 

const nav = {
    width: '100%',
    display: 'flex',
    margin: '0',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
}

const shadow={
    textDecoration: 'none'
}


export default Header
