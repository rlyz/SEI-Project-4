const mongoose = require('../../config/db')
const Schema = mongoose.Schema

const businessSchema = new Schema({
  user: {type: String, required: true},
  storeName: {type: String, unique: true, required: true},
  location: {type: String, required: true},
  openingTime: {type: String, required: true},
  closingTime: {type: String, required: true},
  currentCount: {type: Number, default: 0},
  history: [{date: String, visits: Array}]
})

module.exports = mongoose.model('Business', businessSchema)


