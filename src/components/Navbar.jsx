import React from 'react'
import { connect } from 'react-redux'
import { toggleSignInModal, toggleSignOutModal } from '../actions/actionCreators'

const Navbar = ({
  home: {
    loggedIn,
  },
  toggleSignInModal,
  toggleSignOutModal,
}) => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" style={{ color: '#FFF' }} href='/'>Project Zed</a>
        <form className="form-inline">
          <button
            onClick={(e) => {
              e.preventDefault();
              loggedIn ? toggleSignOutModal() : toggleSignInModal();
            }}
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit">
            { loggedIn ? 'Sign Out' : 'Sign In' }
          </button>
        </form>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ homeReducer }) => {
  return {
    home: homeReducer,
  };
};

export default connect(
  mapStateToProps,
  { toggleSignInModal, toggleSignOutModal },
)(Navbar);
