import React from 'react'
import { toggleSignInModal, toggleSignOutModal } from '../actions/actionCreators'
import { Dispatch, Home, HomeReducer } from '../types/types'

type Props = {
  dispatch: Dispatch,
  home: Home
}

const Navbar = () => {
  // NOTE: setting this to 'true' for testing for now
  const loggedIn = true
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" style={{ color: '#FFF' }} href='/'>Project Zed</a>
        <form className="form-inline">
          <button
            onClick={(e) => {
              e.preventDefault()
              // loggedIn ? this.props.dispatch(toggleSignOutModal()) : this.props.dispatch(toggleSignInModal())
            }}
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit">
            { loggedIn ? `Sign Out` : `Sign In` }
          </button>
        </form>
      </nav>
    </div>
  )
}

export default Navbar
