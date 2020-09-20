import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import users from './user'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    users
  })

export default createRootReducer
