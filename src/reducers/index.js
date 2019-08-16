import { combineReducers } from 'redux'
import projectsReducer from './projectsReducer'
import homeReducer from './homeReducer'

const rootReducer = combineReducers({ projectsReducer, homeReducer })

export default rootReducer
