import { createStore, combineReducers } from 'redux'
import authReducer from '../reducers/auth'

export default createStore(combineReducers({
  auth: authReducer
}))
