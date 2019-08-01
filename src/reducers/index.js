import { combineReducers } from 'redux'
// import { data } from '../data'
import { RECEIVE_PROJECTS, LIKE_PROJECT, DISLIKE_PROJECT } from '../actions/actionCreators'

const INITIAL_STATE = {
  projects: []
}

export function projectsReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.projects
      }
    case LIKE_PROJECT:
      // TODO: try see if I can do it with object.assign
      const i = action.index
      return {
        projects: [
          ...state.projects.slice(0, i),
          { ...state.projects[i], likes: state.projects[i].likes + 1 },
          ...state.projects.slice(i + 1)
        ]
      }
    case DISLIKE_PROJECT:
      const j = action.index
      return {
        projects: [
          ...state.projects.slice(0, j),
          { ...state.projects[j], likes: state.projects[j].likes - 1 },
          ...state.projects.slice(j + 1)
        ]
      }
    default: return state
  }
}

const rootReducer = combineReducers({ projectsReducer })

export default rootReducer
