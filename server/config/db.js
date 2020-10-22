const config = require('./index')
const mongoose = require('mongoose')
const connectionOptions = { 
                            useCreateIndex: true, 
                            useNewUrlParser: true, 
                            useUnifiedTopology: true
                          }

mongoose
.connect(process.env.MONGODB_URI || config.URI, connectionOptions)
.then(() => {
  console.log('db connected')
})
.catch((err) => {
  console.log(err);
})

module.exports = mongoose