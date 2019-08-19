import { TOGGLE_SIGN_IN_MODAL, LOG_IN_STATUS_CHANGE } from '../actions/actionTypes'

const initialState = {
  signinModalOpen: false,
  userUID: null,
  loggedIn: false
}

export default function homeReducer (state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case TOGGLE_SIGN_IN_MODAL:
      return {
        ...state,
        signinModalOpen: !state.signinModalOpen
      }
    case LOG_IN_STATUS_CHANGE:

      return {
        ...state,
        userUID: action.payload.userUID,
        loggedIn: action.payload.loggedIn
      }
    default: return state
  }
}
