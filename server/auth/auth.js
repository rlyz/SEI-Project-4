const express = require('express');
const helpers = require('./auth.helpers')

const router = express.Router()

// routes
router.get('/', ping);
router.post(
  '/login',
  login
);
router.post(
  '/signup', 
  signup
);
router.get(
  '/verify',
  isLoggedIn,
  authorized
)
router.get(
  '/logout',
  logout
)
module.exports = router;

// callbacks
function ping(req, res) {
  res.json({
    message: "auth up and running"
  })
}

// validate input if error throw error
async function login(req, res, next) {
  const { username, password } = req.body
  try {
    const error = await helpers.validateInput(req)
    if (!error) {
      const token = await helpers.checkPasswordGetToken(username, password)
      if (token) {
        // secure to be on so we only send it over https
        res.cookie(
          'jwt', 
          token, 
          {secure: false, httpOnly: true}
        )
        res.json({
          user: username
        })
      }
    }
    // if none of that 
    throw new Error("Check your username/password")
  } catch (err) {
    next(err)
  }
}

// validate input if error throw error
// find user
// if no user then create one
// return token
// if got user then throw error
async function signup(req, res, next) {
  try {
    const { username, password } = req.body
    const error = await helpers.validateInput(req)

    if (!error) {
      const user = await helpers.findUser(username)

      if (user) {
        throw new Error("Username taken: " + username)

      } else {
        // insert user
        const id = await helpers.insertUser(username, password)

        // create token
        const token = await helpers.createToken(id, username)

        // send response
        await res.cookie(
          'jwt', 
          token, 
          {secure: true, httpOnly: true}
        )
        await res.send()
      }
    }
  } catch (err) {
    next(err)
  }
}

async function isLoggedIn(req, res, next) {
  try {
    const accessToken = req.cookies.jwt

    if (!accessToken) {
      throw new Error('forbidden --accesstoken')
    }
    const payload = await helpers.checkToken(accessToken)
    if (payload) {
      req.username = payload.username
      next()
    } else {
      throw new Error('forbidden --bad payload')
    }
  } catch (err) {
    next(err)
  }
}

function authorized(req, res) {
  res.status(200).json({
    user: req.username
  })
}

function logout(req, res) {
  res.clearCookie('jwt')
  res.sendStatus(200)
}




