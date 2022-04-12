const mongoose = require('mongoose')

const TrackingSchema = new mongoose.Schema({
  carrier: { type: String, unique: false, required: true},
  number: { type: String, required:true },
  userName: { type: String, required:true},
  description: {type: String},
  status: {type: Number}
})

module.exports = mongoose.model('Numbers', TrackingSchema)