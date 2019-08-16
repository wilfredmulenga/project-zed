import React from 'react'

class Navbar extends React.Component {
  render () {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" style={{ color: '#FFF' }} href='/'>Project Zed</a>
          <form className="form-inline">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign In</button>
          </form>
        </nav>
      </div>
    )
  }
}

export default Navbar
