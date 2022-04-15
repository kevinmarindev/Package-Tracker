import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Login = ({ pullUserToApp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errs, setErrors] = useState([]);

    let authenticated = JSON.parse(sessionStorage.getItem('user'))
    console.log(authenticated)
    const navigate = useNavigate()
    console.log(sessionStorage.getItem('user'))

    const singIn = async (e) => {
        e.preventDefault()
        if(authenticated) return setErrors(()=> ['There is an user logged in'])
        let res = await axios.post('/login', {
            email, password,
        },{withCredentials: true})
        console.log(res)
        // setData(res.data)
        if(res.data.errors){
            setErrors((prev) => res.data.errors)
            console.log(errs)
        } 
        if(res.data.user){ 
        let user = res.data.user
        await pullUserToApp(user)
        console.log(user)
        navigate('/in')    
        }
    }
    return (
    <Container className="my-5 py-5" >
      {errs ? errs.map((err, idx) => <Alert variant="danger" key={idx}><Alert.Heading>{err}</Alert.Heading></Alert>) : ''}
      <Form className='mt-5 mx-5'>
        
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-5" controlId="formBasicPassword">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Row className="mx-auto">
            <Button onClick={singIn} className="mt-5 mx-auto" variant="primary" type="submit" style={{ width:'30%'}}>
            Submit
            </Button>
        </Row>
      </Form>
    </Container>
  
    );
}

const imageStyle = {
    height: '100vh',
    backgroundImage:  "URL('secondImg.jpg')",
    backgroundSize:   'cover',
    backgroundPosition: 'left',
    zIndex: '0',
 
}

export default Login
