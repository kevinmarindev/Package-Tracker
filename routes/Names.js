const mongoose = require('mongoose')

const NamesSchema = new mongoose.Schema({
    name: {type: String}
})

module.exports = mongoose.model('Names', NamesSchema)