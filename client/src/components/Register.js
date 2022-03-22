import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = ({ pullUserToAppCompo, userLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errs, setErrors] = useState('')
    // const [user, setUser] = useState('')

    const navigate = useNavigate()

    let user

    const registering = async (e) => {
        console.log(username, email, password, confirmPassword)
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
            pullUserToAppCompo(user)
            // navigate('/in')
        }

        // if(user){
        //     console.log(user)

        // }
        // if(res.data.user){
        //     console.log(user)
        //     pullUser(res.data.user)
        //     navigate('/in')
        // }
    // }
    // if(user){
    //     console.log(user)
    //     pullUser(user)
    //     navigate('/in')
    }
    console.log('2nd', userLoggedIn)
  return (
    <Container>
      {errs ? errs.map((err, idx) => <Alert variant="danger" key={idx}><Alert.Heading>{err}</Alert.Heading></Alert>) : ''}  
      <Form className='mt-5 mx-5'>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control required required type="text" placeholder="Username" name='userName' onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" name='email' onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
          <Form.Text className="text-muted">
            For your protection passwords are stored encrypted.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)}/>
        </Form.Group>

        <Button onClick={registering} className="mt-5" variant="primary" type="submit" style={{ width:'20%', marginLeft:"40%", marginRight:'40%'}}>
          Submit
        </Button>
      </Form>
      
    </Container>
  );
};

export default Register;

// let res = await fetch('/register', {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({
        //             "username": username,
        //             "email": email,
        //             "password": password,
        //             "confirmPassword": confirmPassword
        //       })
        //     })

            
        // console.log(res, res.session, res.user)
