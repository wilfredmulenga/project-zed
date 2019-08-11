import React from 'react'

class Navbar extends React.Component {
  render () {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" style={{ color: '#FFF' }}>Project Zed</a>
          <form class="form-inline">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign In</button>
          </form>
        </nav>
      </div>
    )
  }
}

export default Navbar
