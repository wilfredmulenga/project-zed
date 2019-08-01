import { combineReducers } from 'redux'
import { RECEIVE_PROJECTS, LIKE_PROJECT, DISLIKE_PROJECT } from '../actions/actionCreators'

export function projectsReducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return [
        ...state,
        ...action.projects
      ]
    case LIKE_PROJECT:
      // TODO: try see if I can do it with object.assign
      const i = action.index
      return [
        ...state.slice(0, i),
        { ...state[i], likes: state[i].likes + 1 },
        ...state.slice(i + 1)
      ]
    case DISLIKE_PROJECT:
      const j = action.index
      return [
        ...state.slice(0, j),
        { ...state[j], likes: state[j].likes - 1 },
        ...state.slice(j + 1)
      ]
    default: return state
  }
}

const rootReducer = combineReducers({ projectsReducer })

export default rootReducer
