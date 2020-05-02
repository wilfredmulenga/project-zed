import createDataContext from './createDataContext'
const authReducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      return { ...state, loggedIn: action.payload }
    }
    case 'logout': {
      return { ...state, loggedIn: action.payload }
    }
    default:
      return state
  }
}

const loginUser = dispatch => {
  return () => {
    dispatch({ type: 'login', payload: true })
  }
}

const logoutUser = dispatch => {
  return () => {
    dispatch({ type: 'logout', payload: false })
  }
}

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    loginUser,
    logoutUser
  },
  {
    loggedIn: false
  }
)
