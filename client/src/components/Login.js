import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import { useState } from 'react'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('')
    
    const singIn = async (e) => {
        e.preventDefault()
        let res = await axios.post('/login', {
            email: email,
            password: password,
        },{withCredentials: true})
        console.log(res, res.data, res.data.errors, res.session, res.user)
        setData(res.data)
    }
    return (
    <Container>
      <Form className='mt-5 mx-5'>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Button onClick={singIn} className="mt-5" variant="primary" type="submit" style={{ width:'20%', marginLeft:"40%", marginRight:'40%'}}>
          Submit
        </Button>
      </Form>
    </Container>
  
    );
}

export default Login
