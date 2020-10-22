// create store

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const middlewares = applyMiddleware(thunk)

export default createStore(rootReducer, composeWithDevTools(middlewares))
