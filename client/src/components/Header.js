import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { FaBox } from 'react-icons/fa'

const Header = () => {
    return (
        <Navbar bg="light" expand="md" >
            <Container >
                <Navbar.Brand href="#home" className=' my-3' style={spacing}>Track them all<FaBox className='ms-2'/>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={ nav }>
                        <Nav.Link href="#home" >Login</Nav.Link>
                        <Nav.Link href="#link" >Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
    )
}
const spacing = {
    width: '50%',
    marginRight: '20%'
    
}

const nav = {
    width: '50%',
    display: 'flex',
    
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    
    
}


export default Header
