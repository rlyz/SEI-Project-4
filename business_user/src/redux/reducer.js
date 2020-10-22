// combine all reducers
import { combineReducers } from 'redux'
import authReducer from './auth'
import shopReducer from './shops'

const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer
})

export default rootReducer;