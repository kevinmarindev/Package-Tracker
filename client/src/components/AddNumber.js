import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import { useState, useRef } from 'react'


const AddNumber = () => {
    const [errs, setErrors] = useState([]);
    const [succ, setSucc] = useState(false)
    const [tracknum, setTrackNum] = useState('')
    const [description, setDescription] = useState('')
    const carrier = useRef('usps')
    

    const submitTrack = async(e) =>{
        e.preventDefault()
        // setErrors(() => []),
        // setSucc(() => false),
        console.log(tracknum, carrier, description)

        if(!tracknum) return setErrors(()=> ['Please enter a tacking number']);

        let res = await axios.post('/numbers/posttracking', {
          carrier: carrier.current,
          tracknum,
          description
        }, {withCredentials: true})

        console.log(res)

        if(res.data.errors){
            setErrors((prev) => res.data.errors)
            setSucc((prev) => false)
            console.log(errs)
        } 

        if(res.data.success){
            setErrors((prev) => [])
            setSucc((prev)=> true)
        }
    }

    

    return (
        <Container>
            <Form>
                <Form.Select required aria-label="Select carrier" name="carrier" className='my-5' onBlur={(e) => carrier.current = e.currentTarget.value}>
                    <option value="usps" >USPS</option>
                    <option value="ups">UPS</option>
                    <option value="fedex">FEDEX</option>
                </Form.Select>
                <Form.Group className="my-5" controlId="trackingnum">
                    <Form.Control required type="text" placeholder="Enter Tracking number" name='tracking' onChange={(e) => setTrackNum(e.target.value)}/>
                </Form.Group>
                <Form.Group className="my-5" controlId="description">
                    <Form.Control type="text" placeholder="Enter a description of item being tracked" maxLength='30' name='description' onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <Row>
                    <Button variant="primary" type="submit" className='mx-auto mb-5' onClick={submitTrack} style={{width:'30%'}}>
                        Submit 
                    </Button>
                </Row>
            </Form>
            {errs ? errs.map((err, idx) => <Alert variant="danger" key={idx}><Alert.Heading>{err}</Alert.Heading></Alert>) : ''}
            {succ ? (<Alert variant="success"><Alert.Heading>Item added successfully</Alert.Heading></Alert>) : ''}  
        </Container>
    
    )
}

export default AddNumber
