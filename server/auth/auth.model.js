const mongoose = require('../config/db')
const Schema = mongoose.Schema

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', schema)