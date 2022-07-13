const express = require('express')
const router = express.Router();
const TrackSchema = require('../models/Numbers')
const axios = require('axios')
const md5 = require('md5')
const translate = require('translate')



router.post('/posttracking', async (req, res)=>{
    console.log(req.user.username)
    const validationErrors = []
    let carrier = req.body.carrier
    let trackingNumber = req.body.tracknum
    let description = req.body.description
    console.log(carrier, trackingNumber)
    const encrypKey = () => {
        const obj2Encrypt = `{"area_show":1,"carrier_id":"${carrier}","order":"desc","phone":"","ship_from":"","ship_to":"","tracking_number":"${trackingNumber}"}sovUoovfRIZI7116b865c79955714c2b86e50213afc3f84e`;
        return md5(obj2Encrypt).toUpperCase()
    }

    let signature = encrypKey() 

    let apiFetch = await axios.post('https://www.kd100.com/api/v1/tracking/realtime', {
           area_show: 1,
           carrier_id: carrier,
           order: "desc",
           phone: "",
           ship_from: "",
           ship_to: "",
           tracking_number: trackingNumber
        }, {withCredentials: true, headers: {
            "Content-Type": "application/json",
            "API-Key": "sovUoovfRIZI7116",
            "signature": signature
        }
        })
        let obj = apiFetch.data
        console.log(obj)
        if(apiFetch.data.code !== 200) {
            validationErrors.push('Please ensure the tracking number and carrier are correct')
            return res.send({'errors': validationErrors})
        }

        
        let existingDoc =  await TrackSchema.find({ userName: req.user.username, number: trackingNumber})

        console.log(existingDoc, existingDoc.length)

        if(existingDoc.length != 0){
            validationErrors.push('Package is already being tracked')
            return res.send({'errors': validationErrors})
        }
        
        let oneTrackNum = new TrackSchema({
            carrier: carrier,
            number: trackingNumber,
            userName: req.user.username,
            description: description,
            status: obj.data.order_status_code
        }).save()

        res.send({success: apiFetch.data })
})

router.get('/gettrackings', async (req, res)=>{
    console.log('in this bee')
    console.log(req.user)
    
    const numbers = await TrackSchema.find({ userName: req.user.username})
    console.log(numbers)
    res.send(numbers)
})


router.post('/getsingletrackingups', async (req, res)=>{
    console.log(req.user.username)
    let carrier = req.body.carrier
    let trackingNumber = req.body.tracknum
    // let description = req.body.description
    console.log(carrier, trackingNumber)
    const encrypKey = () => {
        const obj2Encrypt = `{"area_show":1,"carrier_id":"${carrier}","order":"desc","phone":"","ship_from":"","ship_to":"","tracking_number":"${trackingNumber}"}sovUoovfRIZI7116b865c79955714c2b86e50213afc3f84e`;
        return md5(obj2Encrypt).toUpperCase()
    }

    let signature = encrypKey() 

    let apiFetch = await axios.post('https://www.kd100.com/api/v1/tracking/realtime', {
           area_show: 1,
           carrier_id: carrier,
           order: "desc",
           phone: "",
           ship_from: "",
           ship_to: "",
           tracking_number: trackingNumber
        }, {withCredentials: true, headers: {
            "Content-Type": "application/json",
            "API-Key": "sovUoovfRIZI7116",
            "signature": signature
        }
        })
        let obj = apiFetch.data
        console.log(obj.data.carrier_id)

        let arr = obj.data.items

        arr.map( async (item, idx)=>{
            item.context = item.context.replace(/.*\]/, '')
            console.log(item.context)
            const trans = await translate(item.context, { to: 'English', from: 'Chinese' })
            console.log(trans)
            item.context = trans
            console.log(obj.data.items[idx].context)
            obj.data.items[idx].context = trans
            
            console.log(obj.data.items[idx].context)
            console.log(obj.data.items[idx].context)
            if(idx == arr.length - 1) res.send(obj.data)
        })

    }
)

router.post('/getsingletracking', async (req, res)=>{
    console.log(req.user.username)
    let carrier = req.body.carrier
    let trackingNumber = req.body.tracknum
    // let description = req.body.description
    console.log(carrier, trackingNumber)
    const encrypKey = () => {
        const obj2Encrypt = `{"area_show":1,"carrier_id":"${carrier}","order":"desc","phone":"","ship_from":"","ship_to":"","tracking_number":"${trackingNumber}"}sovUoovfRIZI7116b865c79955714c2b86e50213afc3f84e`;
        return md5(obj2Encrypt).toUpperCase()
    }

    let signature = encrypKey() 

    let apiFetch = await axios.post('https://www.kd100.com/api/v1/tracking/realtime', {
           area_show: 1,
           carrier_id: carrier,
           order: "desc",
           phone: "",
           ship_from: "",
           ship_to: "",
           tracking_number: trackingNumber
        }, {withCredentials: true, headers: {
            "Content-Type": "application/json",
            "API-Key": "sovUoovfRIZI7116",
            "signature": signature
        }
        })
        let obj = apiFetch.data
        console.log(obj.data.carrier_id)

        let arr = obj.data.items

        arr.map(item =>{
            item.context = item.context.replace(/.*\]/, '')
        })

        
        res.send(obj.data)
    }
)


router.delete('/deleteone', async (req, res)=>{
    console.log('in here', req.body)
    // console.log(req.user.username)
    // const validationErrors = []
    // let carrier = req.body.carrier
    let trackingNumber = req.body.tracknum
    let user = req.user.username
    // let description = req.body.description
    console.log(user, trackingNumber)
    
    let objToDelete = await TrackSchema.deleteOne({ userName: user, number: trackingNumber})
    // await TrackSchema.find({ userName: req.user.username, number: trackingNumber})

    res.send("Item deleted")
})




module.exports = router 