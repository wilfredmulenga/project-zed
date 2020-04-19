import { LOAD_PROJECTS_SUCCESS, LIKE_PROJECT, DISLIKE_PROJECT } from '../actions/actionTypes'
// comment the line below if you are using data from your firebase database and set the state param in the projectsReducer to []
import data from '../data'

export default function projectsReducer (state = [data], action) {
  switch (action.type) {
    case LOAD_PROJECTS_SUCCESS:
      return [
        ...state,
        ...action.payload
      ]
    case LIKE_PROJECT:
      const i = action.index
      return [
        ...state.slice(0, i),
        { ...state[i], likes: state[i].likes + 1, likedBy: [...state[i].likedBy, action.userUID] },
        ...state.slice(i + 1)
      ]
    case DISLIKE_PROJECT:
      const j = action.index
      return [
        ...state.slice(0, j),
        { ...state[j], likes: state[j].likes - 1, likedBy: state[j].likedBy.filter(userUID => userUID !== action.userUID) },
        ...state.slice(j + 1)
      ]
    default: return state
  }
}
