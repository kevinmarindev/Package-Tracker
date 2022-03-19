import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <Navbar bg="light" expand="md" >
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={ nav }>
                        <Nav.Link>
                            <Link style={shadow} to='/login'>Sign in</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link style={shadow} to='/register'>Register</Link>
                        </Nav.Link>
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
    textShadow: '0 0 2px RGB(175 22 249)'
}


export default Header
