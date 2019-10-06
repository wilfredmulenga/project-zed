// @flow

import React from 'react'
import Modal from 'react-modal'
import firebase from '../../config/firebase'
import { connect } from 'react-redux'
import { toggleSignOutModal, logInStateChange } from '../../actions/actionCreators'

Modal.setAppElement('#root')

class SignOutModal extends React.Component {
  signOut = () => {
    firebase.auth().signOut()
    localStorage.removeItem('userInfo')
    this.props.dispatch(logInStateChange({ userUID: null, userLoggedIn: false }))
    this.props.dispatch(toggleSignOutModal())
  }

  render () {
    const { isOpen } = this.props
    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Sign out modal">
        <div className='SignOutModal'>
          <h3>Sign Out ?</h3>
          <hr/>
          <div className='SignOutModal'>
            <button
              onClick={this.signOut}
              type="button"
              className="btn btn-outline-danger SignOutModalYes">
            Yes
            </button>
            <button
              onClick={() => this.props.dispatch(toggleSignOutModal())}
              type="button"
              className="btn btn-outline-danger SignOutModalNo">
            No
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

const customStyles = {
  content: {
    width: '30%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export default connect(null)(SignOutModal)
