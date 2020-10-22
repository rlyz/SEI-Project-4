const config = require('../config')
const Joi = require('joi')
const User = require('./auth.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// validation
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(6).max(24).required(),
  password: Joi.string().min(6).max(32).required()
})

module.exports = {
  validateInput,
  findUser,
  insertUser,
  createToken,
  checkToken,
  checkPasswordGetToken
}

// specific functions
function validateInput(req) {
  const result = schema.validate(req.body)
  if (!result.error) {
    return false
  } else {
    throw new Error(result.error)
  }
}

async function findUser(username) {
  try {
    const user = await User.findOne({
      username: username
    })

    if (user) {
      return user
    } else {
      return false
    }
  } catch (err) {
    next(err)
  }
}

async function insertUser(username, password) {
  // hash password
  // insert
  // return the user
  const hash = await bcrypt.hash(password, parseInt(config.ROUNDS))
  const newUser = new User({
    username,
    hash
  })
  const saved = await newUser.save()
  return saved._id
}

function createToken(id, username) {
  const payload = {
    _id: id,
    username,
  }

  const token = jwt.sign(
    payload,
    config.SECRET, {
      expiresIn: '1d'
    }
  )
  return token
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

async function checkPasswordGetToken(username, password) {
  const user = await User.findOne({username})
  if ( user && bcrypt.compareSync(password, user.hash)) {
    const token = createToken(user._id, username)
    return token
  } else {
    return false
  }
}









