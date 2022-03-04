const express = require('express')
const router = express.Router();
const User = require('../models/User')
const Names = require('../routes/Names')

router.get('/', async (req, res) =>{
    let item = await Names.find( { name: 'kevin'} );
    res.send(item)
})

router.post('/', async (req, res) => {
    try{
    let itemToPost = req.body.name;
    await Names.create({ name: itemToPost })
    res.json('item created')
    }
    catch (e){
        console.log(e)
    }
} )

module.exports = router;