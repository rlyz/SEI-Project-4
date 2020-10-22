const express = require('express')
const path = require('path')

const router = express.Router()

module.exports = router;

// routes
if (process.env.NODE_ENV === 'production') {
  // // admin routes
  router.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin_user/build', 'index.html'))
  })

  // // business routes
  router.get('/business/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../business_user/build', 'index.html'))
  })

  // public routes
  router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public_user/build/index.html'))
  })
}

// // api routes
// app.get('/api/ping', (req, res) => {
//   res.send('server is up and running')
// })

// // store clients here
// let clients = [];

// // sse routes
// app.get('/sse-test', (req, res) => {

//   console.log('client connected');

//   res.set({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     "Connection": "keep-alive",
//     "Access-Control-Allow-Origin": "*"
//   });

//   res.flushHeaders();
//   // res.write('retry: 10000\n\n');

//   clients.push(res)

//   // let counter = 0;
//     // let interValID = setInterval(() => {
//     //     counter++;
//     //     if (counter > 10) {
//     //         clearInterval(interValID);
//     //         res.end(); // terminates SSE session
//     //         return;
//     //     }
//     //     console.log('sent: ' + counter);
//     //     res.write(`data: ${counter}\n\n`); // res.write() instead of res.send()
//     // }, 1000);

//     // If client closes connection, stop sending events
//     res.on('close', () => {
//         console.log('client dropped me');
//         // clearInterval(interValID);
//         clients.pop()
//         res.end();
//     });
// });

// app.post('/sse-test', (req, res) => {
//   const data = req.body
//   console.log(data, '--data');
//   clients[0].write(`data: ${data.value}\n\n`)
//   res.status(200).send({success: "suxsex"});
// })