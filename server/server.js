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
app.use('/admin', express.static(path.join(__dirname, '../admin_user/build')))
app.use('/business', express.static(path.join(__dirname, '../business_user/build')))
app.use(express.static(path.join(__dirname, '../public_user/build')))

// initialize routes

// for testing
// app.get('/sse', sse) 

// function sse(req, res) {
//   try {
//     console.log('received sse');
//     res.set({
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache",
//       "Connection": "keep-alive",
//       "Access-Control-Allow-Origin": "*"
//     });
//     res.write('retry: 30000\n\n')

//     res.on('close', () => {
//       console.log('client dropped me');
//       res.end();
//     });

//     let n = 0
//     const timer = setInterval(()=> {
//       res.write('data: "ping"\n\n')
//       res.flushHeaders();

//       if (n == 5) {
//         clearInterval(timer)
//         res.end()
//       }
//       console.log(n);
//       n++
//     }, 10000)

//   } catch (err) {
//     next(err)
//   }
// }





// auth routes
const auth = require('./auth/auth.js')
app.use('/auth', auth.router)

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