import { combineReducers } from 'redux'
import { data } from '../data'
import { RECEIVE_PROJECTS, LIKE_PROJECT } from '../actions/actionCreators'

export function projectsReducer (state = data, action) {
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.projects
      }
    case LIKE_PROJECT:
      // TODO: try see if I can do it with object.assign
      const i = action.index
      // console.log('here', ...state.projects.slice(i + 1))
      console.log([
        ...state.projects.slice(0, i),
        { ...state.projects[i], likes: state.projects[i].likes + 1 },
        ...state.projects.slice(i + 1)
      ])
      return state
    default: return state
  }
}

const rootReducer = combineReducers({ projectsReducer })

export default rootReducer
