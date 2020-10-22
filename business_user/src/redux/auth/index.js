// CONSTANTS
export const USER_VERIFY = 'USER_VERIFY'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

// ACTIONS
const validUser = (user, valid = true) => {
  return {
    type: USER_VERIFY,
    payload: {
      user,
      valid
    }
  }
}

export const verifyUser = () => dispatch => {
  fetch('/auth/verify')
  .then(res => {
    if (res.ok) {
      res.json()
      .then(data => {
        dispatch(validUser(data.user, true))
      })
    } else {
      return dispatch(validUser(null, false))
    } 
  })
  .catch(err => dispatch(validUser(null, false)))
}

export const loginUser = (cred, history) => dispatch => {
  const url = '/auth/login'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cred)
  }
  fetch(url, options)
  .then(res => res.json())
  .then(res => {
    if (res.user) {
      dispatch(validUser(res.user, true))
      history.push('/')
    }
  })
  .catch(err => dispatch(validUser(null, false)))
}

export const logoutUser = () => dispatch => {
  // clear cookies
  fetch('/auth/logout')
  .then(res => dispatch({type: LOGOUT}))
  .catch(err => dispatch({type: LOGOUT}))
}

export const signupUser = (cred, history) => dispatch => {
  const url = '/auth/signup'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cred)
  }
  fetch(url, options)
  .then(res => res.json())
  .then(res => {
    if (res.user) {
      dispatch(validUser(res.user, true))
      history.push('/')
    }
  })
  .catch(err => dispatch(validUser(null, false)))
}

// REDUCERS
const initialState = {
  loading: true,
  user: null,
  isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_VERIFY: 
      return {
       ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: action.payload.valid,
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}

export default authReducer;