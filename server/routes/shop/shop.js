const express = require('express');
const helpers = require('./shop.helpers')
const auth = require('../../auth/auth')

const router = express.Router()

// routes
// get all shops for one business
router.get('/getall', auth.isLoggedIn, getall)

// register a shop
router.post('/register', auth.isLoggedIn, register)

// check into a shop
router.post('/checkin', checkin)

// check out from a shop
router.patch('/checkout', checkout)

// sse route 
router.get('/counter', auth.isLoggedIn, counter)

module.exports = router;

async function register(req, res, next) {
  try {
    console.log(req.body);
    const shop = await helpers.insertBusiness(req.body)
    console.log(shop._id);
    await res.json({
      message: 'ok can',
      id : shop._id
    })
  } catch (err) {
    console.log(err);
    next(err)
  }
}


// global mapping for one business and not shop
let sseClients = new Map

function counter(req, res, next) {
  try {
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*"
    });

    res.flushHeaders();
    res.write('retry: 30000\n\n')
    
    const client = req.username
    sseClients.set(client, res)
    console.log(`${client} connected`);
    
    req.on('close', () => {
      console.log('client dropped me');
      sseClients.delete(client)
      res.end();
    });

    res.on('close', () => {
      sseClients.delete(client)
      res.end();
    })
  } catch (err) {
    next(err)
  }
}

function sendToStore(business, storeName) {
  console.log(business, '--business');
  if (sseClients.get(business)) {
    sseClients.get(business).write('data: "lmao"\n\n')
  }
}

async function checkin(req, res, next) {
  try {
    const {business, storeName, user} = req.body
    await helpers.checkin(user, storeName)
    await sendToStore(business, storeName)
    await res.json({
      message: 'ok'
    })
  } catch (err) {
    next(err)
  }
}

async function getall(req, res, next) {
  try {
    const allShop = await helpers.getAllShops(req)
    await res.json({
      shops: allShop
    })
  } catch (err) {
    next(err)
  }
}

async function checkout(req, res, next) {
  try {
    console.log(req.body);
    const removed = await helpers.checkoutUser(req.body)
    if (removed) {
      res.json({
        message: `checked out ${req.body.user}`
      })
    } 
  } catch (err) {
    next(err)
  }
}

