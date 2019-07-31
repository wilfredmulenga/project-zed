import { combineReducers } from 'redux'

import { RECEIVE_PROJECTS } from '../actions/actionCreators'

export function projectsReducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.projects
      }
    default: return state
  }
}

const rootReducer = combineReducers({ projectsReducer })

export default rootReducer
