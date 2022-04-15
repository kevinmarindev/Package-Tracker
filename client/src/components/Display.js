import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import IndividualItems from './IndividualItems'

const Display = () => {
    const [items, setItems] = useState([])
    const [refresh, setRefresh] = useState('')
    let item 
    let reRender = (inHere) => {
        setRefresh(()=> inHere)
    }

    useEffect( async () => {
        let getItems = await axios.get('/numbers/gettrackings', {
        }, {withCredentials: true})
        console.log(getItems.data)
        setItems(()=> [...getItems.data])
    },[refresh])

    console.log(items)
    

    return (
        <div style={imageStyle} className='pt-5'>
        <Container className='pt-5' style={{overflow: "visible"}}>

        {items.length >= 1 ? items.map((item, idx) => <IndividualItems key={item._id} carrier={item.carrier} number={item.number} status={item.status} id={item._id} description={item.description} reRender={reRender}/>) : 
        <Alert variant="info" className='mt-5'>No packages are being tracked please add items above</Alert>}

        </Container>
        </div>
    )
}

const imageStyle = {
    height: '100vh',
    backgroundImage:  "URL(https://res.cloudinary.com/dpivoqpxh/image/upload/v1649997195/11_go1dog.jpg)",
    backgroundSize:   'repeat',
    backgroundPosition: 'left',
    zIndex: '0',
 
}
export default Display
