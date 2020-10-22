const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const config = require('./config')

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(cookieParser())

// static files
app.use('/admin', express.static(path.join(__dirname, 'admin_user/build')))
app.use('/business', express.static(path.join(__dirname, 'business_user/build')))
app.use(express.static(path.join(__dirname, 'public_user/build')))

// initialize routes


// auth routes
const auth = require('./auth/auth.js')
app.use('/auth', auth)

// shop routes
const shop = require('./routes/shop/shop.js')
app.use('/shop', shop)

// normal routes
// all routes shld be redirected here
const routes = require('./routes/routes.js')
app.use('/', routes)

// to be added last
// error handling
// catch all statement 404
app.use(function(req, res, next) {
  const err = new Error('Not found...');
  err.status = 404;
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  })
})

// deploy server
const PORT = config.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}!`),
);