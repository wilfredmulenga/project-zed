import createDataContext from './createDataContext'
const authReducer = (state, action) => {
  const { userUID, value } = action.payload
  switch (action.type) {
    case 'login': {
      return { ...state, loggedIn: value, userUID }
    }
    case 'logout': {
      return { ...state, loggedIn: value, userUID: '', isLoginModalOpen: false }
    }
    case 'openLoginModal': {
      return { ...state, isLoginModalOpen: value }
    }
    case 'closeLoginModal': {
      return { ...state, isLoginModalOpen: value }
    }
    default:
      return state
  }
}

const loginUser = dispatch => {
  return (uid) => {
    dispatch({ type: 'login', payload: { userUID: uid, value: true } })
  }
}

const logoutUser = dispatch => {
  return (uid) => {
    dispatch({ type: 'logout', payload: { userUID: uid, value: false } })
  }
}

const openLoginModal = dispatch => {
  return () => {
    dispatch({ type: 'openLoginModal', payload: { value: true } })
  }
}

const closeLoginModal = dispatch => {
  return () => {
    dispatch({ type: 'closeLoginModal', payload: { value: false } })
  }
}

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    loginUser,
    logoutUser,
    openLoginModal,
    closeLoginModal
  },
  {
    loggedIn: false,
    userUID: '',
    isLoginModalOpen: false
  }
)
