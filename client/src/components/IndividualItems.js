import React from 'react'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react';



const IndividualItem = ({ carrier, number, id, description, reRender }) => {
    const [displaying, setDisplaying] = useState(false)
    const [data, setData] = useState('')

    const statusCodes = {
        0 : "In Transit",
        1 : "Carrier has Accepted the package",
        2 : "Exception",
        3 : "Delivered",
        4 : "Returned to Sender",
        5 : "Out for Delivery",
        6 : "Returning to sender",
        7 : "Shipment is being transferred from one carrier to another",
        10 : "Awaiting customs clearance",
        11 : "Package handed over to Customs",
        12 : "Package cleared customs",
        13 : "Excepetion in Customs",
        14 : "Recepient Refused"
    }

    const showOrNo = () =>{
        setDisplaying(prev => !prev)
        
    }
    const getDetails = async () =>{
        if(displaying){
            let res = await axios.post('/numbers/getsingletracking', {
                  carrier,
                  tracknum: number
                }, {withCredentials: true})
                console.log(res)
                setData((prev)=> res.data)
            }
        }


    const deleteOne = async () => {
        let res = await axios.delete('/numbers/deleteone', {
            data:{
                  carrier,
                  tracknum: number
        }})
        console.log(res)
        reRender(number)
    }

    console.log(displaying, data)
    return (
        <Row className="my-3" >
            <Accordion>
                <Accordion.Item eventKey={id} className='bg-light border-primary'>
                    <Accordion.Header onMouseDown={showOrNo} onMouseUp={getDetails}>
                        {description ? description : `${carrier.toUpperCase()} : ${number}`}
                        {/* <FaTrash className="ms-5"/> */}
                        {/* <Button variant="danger" size="sm">Delete</Button> */}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container fluid className="mb-4" className="text-success">
                            {`${carrier.toUpperCase()}: ${number}`}
                            <br/>
                            Package Status: {statusCodes[data.order_status_code]}
                            <br/>
                            <Button variant="danger" size="sm" onClick={deleteOne}>Delete</Button>
                        </Container>
                        {data.items ? data["items"].map((item, idx)=> <Card className="my-2" border="secondary" key={idx}>
                        <Card.Header>{item.order_status_description}</Card.Header>
                        <Card.Body>
                            <Card.Title>{item.location}</Card.Title>
                            <Card.Text>{item.time}</Card.Text>
                        </Card.Body>
                        </Card>) : ''}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Row>
    )
}

const styleIt = {
    backgroundColor: 'rgba(15,10,85,0.2)'
 
}
const shadow={
    textShadow: '0 0 2px RGB(175 22 249)'
}

export default IndividualItem
