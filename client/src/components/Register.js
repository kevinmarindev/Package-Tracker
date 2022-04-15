import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = ({ pullUserToApp }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errs, setErrors] = useState([])
    // const [user, setUser] = useState('')

    const navigate = useNavigate()
    let authenticated = JSON.parse(sessionStorage.getItem('user'))
    let user

    const registering = async (e) => {
        if(authenticated) return setErrors(()=> ['There is an user logged in'])
        e.preventDefault()
        let res = await axios.post('/register', {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        },{withCredentials: true})
        
        console.log(res, res.data)

        if(res.data.errors){
            setErrors((prev) => res.data.errors)
            console.log(errs)
        } 
        
        if(res.data.user){
            // setUser((prev)=> res.data.user)
            user = res.data.user
            console.log(user)
            await pullUserToApp(user)
            navigate('/in')
        }
    }
    console.log('2nd', user)
  return (

    <Container className="py-3 my-5">
      {errs ? errs.map((err, idx) => <Alert variant="danger" key={idx}><Alert.Heading>{err}</Alert.Heading></Alert>) : ''}  
      <Form className='mt-5 mx-5'>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="fw-bold">Username</Form.Label>
          <Form.Control required required type="text" placeholder="Username" name='userName' onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <Form.Text className="text-muted">
            For your protection passwords are stored encrypted.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label className="fw-bold">Confirm Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form.Group>
        <Row className="mx-auto">
            <Button onClick={registering} className="mt-5 mx-auto mb-3" variant="primary" type="submit" style={{width:"30%"}}>
                Submit
            </Button>
        </Row>
      </Form>
      
    </Container>
  );
};

export default Register;

