import React from 'react'
import { connect } from 'react-redux'
import { toggleSigninModal } from '../actions/actionCreators'

class Navbar extends React.Component {
  render () {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" style={{ color: '#FFF' }} href='/'>Project Zed</a>
          <form className="form-inline">
            <button
              onClick={(e) => {
                e.preventDefault()
                this.props.dispatch(toggleSigninModal())
              }}
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit">
               Sign In
            </button>
          </form>
        </nav>
      </div>
    )
  }
}

export default connect(null)(Navbar)
