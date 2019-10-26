import { TOGGLE_SIGN_IN_MODAL, LOG_IN_STATUS_CHANGE, TOGGLE_SIGN_OUT_MODAL, TOGGLE_SUBMIT_PROJECT_MODAL } from '../actions/actionTypes'

const initialState = {
  signInModalOpen: false,
  signOutModalOpen: false,
  userUID: null,
  loggedIn: false,
  submitProjectModalOpen: false
}

export default function homeReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIGN_IN_MODAL:
      return {
        ...state,
        signInModalOpen: !state.signInModalOpen
      }
    case TOGGLE_SIGN_OUT_MODAL:
      return {
        ...state,
        signOutModalOpen: !state.signOutModalOpen
      }
    case LOG_IN_STATUS_CHANGE:

      return {
        ...state,
        userUID: action.payload.userUID,
        loggedIn: action.payload.loggedIn
      }

    case TOGGLE_SUBMIT_PROJECT_MODAL:

      return {
        ...state,
        submitProjectModalOpen: !state.submitProjectModalOpen
      }
    default: return state
  }
}
