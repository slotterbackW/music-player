import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import logger from 'redux-logger'

const initialState = {}

const middleware = [
  thunk,
  logger
]

const composedEnhancers = applyMiddleware(...middleware)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store