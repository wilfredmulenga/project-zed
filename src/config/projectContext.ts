import createDataContext from './createDataContext'
// import data from '../data'
import { LOAD_PROJECTS_SUCCESS } from '../actions/actionTypes'

const projectsReducer = (state, action) => {
  const { index, userUID, value } = action.payload
  switch (action.type) {
    case 'like':
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          likes: state[index].likes + value,
          likedBy: [...state[index].likedBy, userUID]
        },
        ...state.slice(index + 1)
      ]
    case 'unlike':
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          likes: state[index].likes + value,
          likedBy: state[index].likedBy.filter(id => id !== userUID)
        },
        ...state.slice(index + 1)
      ]
    case LOAD_PROJECTS_SUCCESS:
      return [
        ...value // NOTE: not returning 'state' here as the it is hard to distinguish which entries from 'state'
      ] // and those from 'values'
    default:
      return state
  }
}

const likeProject = dispatch => {
  return (index, userUID) => {
    dispatch({
      type: 'like', payload: { index, userUID, value: 1 } })
  }
}

const unlikeProject = dispatch => {
  return (index, userUID) => {
    dispatch({ type: 'unlike', payload: { index, userUID, value: -1 } })
  }
}

const loadProjects = dispatch => {
  return (result) => {
    dispatch({ type: LOAD_PROJECTS_SUCCESS, payload: { value: result } })
  }
}

export const { Context, Provider } = createDataContext(
  projectsReducer,
  {
    likeProject,
    unlikeProject,
    loadProjects
  },
  []
)
