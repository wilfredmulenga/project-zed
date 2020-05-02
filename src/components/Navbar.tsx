import React, { useContext } from 'react'
import { Context as AuthContext } from '../config/authContext'

const Navbar = ({ handleModalOpen }) => {
  const { state, openLoginModal } = useContext(AuthContext)
  const { loggedIn } = state

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" style={{ color: '#FFF' }} href='/'>Project Zed</a>
        <form className="form-inline">
          <button
            onClick={(e) => {
              e.preventDefault()
              openLoginModal()
            }
            }
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
