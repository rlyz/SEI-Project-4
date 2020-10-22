const jwt = require('jsonwebtoken')
const config = require('../../config')
const Business = require('./shop.model')

module.exports = {
  insertBusiness,
  findBusiness,
  checkin,
  getAllShops,
  checkoutUser
}

async function insertBusiness({user, storeName}) {
  const opD = new Date(2020, 1, 1, 10)
  const clD = new Date(2020, 1, 1, 18, 30)
  const newBusiness = new Business({
    user,
    storeName,
    location: "street road block",
    openingTime: opD,
    closingTime: clD,
  })
  
  newBusiness.visits = {}
  newBusiness.markModified('visits')
  const shop = await newBusiness.save()
  return shop
}

async function findBusiness({user}) {
  const business = await Business.findOne({
    user
  })

  if (business) {
    return business
  } else {
    return false
  }
}

async function checkin(user, storeName) {
  const business = await Business.findOne({
    storeName
  })

  let time = new Date()
  time = time.toTimeString();
  const today = new Date().toDateString()
  if (business) {
    const index = business.history.findIndex(item => item.date == today)
    if( index !== -1 ) {
      business.updateOne({$inc: {"currentCount": 1}})
      business.history[index].visits.push({user, entry: time})
    } else {
      business.updateOne({$set: {"currentCount": 1}})
      business.history.push({date: today, visits: [{user, entry: time, exit: null}]})
    }
    business.save()
  } else {
    throw new Error('no store found')
  }
}

function checkToken(token) {
  // check if valid
  // we can check roles and access here too
      // use jwt lib to decode
  try {
    return jwt.verify(token, config.SECRET)
  } catch (err) {
    throw new Error('Unable to verify token')
  }
}

async function getAllShops(req) {
  const payload = await checkToken(req.cookies.jwt);
  const business = await Business.find({
    user : payload.username
  }, '_id storeName location openingTime closingTime currentCount')
  return business
}

async function checkoutUser({ user, storeName}) {
  const business = await Business.findOne({
    storeName
  })

  let time = new Date()
  time = time.toTimeString();
  const today = new Date().toDateString()
  if (business) {
    const index = business.history.findIndex(item => item.date == today)
    if( index !== -1 ) {
      // find entry and update
      const rm_index = business.history[index].visits.findIndex(entry => entry.user == user && !entry.exit)
      
      if (rm_index === -1) {
        throw new Error('no entry found')
      }
      business.updateOne({$inc: {"currentCount": -1}})
      business.history[index].visits[rm_index].exit = time
      business.markModified(`history.${index}.visits.${rm_index}.exit`)
      business.save()
      
    } else {
      throw new Error('no entry found')
    }
    return true
  } else {
    throw new Error('no store found')
  }
}