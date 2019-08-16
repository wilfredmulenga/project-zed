import { TOGGLE_SIGN_IN_MODAL } from '../actions/actionTypes'

const initialState = {
  signinModalOpen: false
}

export default function homeReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIGN_IN_MODAL:
      return {
        ...state,
        signinModalOpen: !state.signinModalOpen
      }
    default: return state
  }
}
