// @flow

import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import firebase from '../../config/firebase'
import { toggleSigninModal, logInStateChange } from '../../actions/actionCreators'
import facebook from '../../images/facebook.svg'
import google from '../../images/google.png'
import github from '../../images/github.png'

Modal.setAppElement('#root')

class SignInModal extends React.Component {
  authenticate = provider => {
    this.props.dispatch(toggleSigninModal())
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebase.auth().signInWithPopup(authProvider)
      .then(this.authHandler)
      .catch(function (error) {
        console.log(error)
      })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userInfo = { userUID: user.uid, loggedIn: true }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.props.dispatch(logInStateChange(userInfo))
      } else {
        localStorage.removeItem('userInfo')
        this.props.dispatch(logInStateChange({ userUID: null, loggedIn: false }))
      }
    })
  }

  // TODO: check if this line is needed
  authHandler = async authData => {
    if (authData.credential.email) {
      // this.props.dispatch(toggleSigninModal())
    }
  }

  render () {
    const { isOpen } = this.props
    return (

      <Modal
        isOpen={isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Sign in modal"
        onClick={() => console.log('modal clicked')}>
        <div className='SigninModal'>
          <h3>Sign In</h3>
          <hr/>
          <div className='socialSigninButton facebook' onClick={() => this.authenticate('Facebook')}>
            <img src={facebook} alt='facebook icon' />
            <p>Facebook</p>
          </div>
          <div className='socialSigninButton google' onClick={() => this.authenticate('Google')}>
            <img src={google} alt='google icon' />
            <p>Google</p>
          </div>
          <div className='socialSigninButton github' onClick={() => this.authenticate('Github')}>
            <img src={github} alt='github icon' />
            <p>Github</p>
          </div>
        </div>
        <div className='modalCloseButton'>
          <button
            onClick={() => this.props.dispatch(toggleSigninModal())}
            type="button"
            className="btn btn-outline-danger">
            Close
          </button>
        </div>
      </Modal>
    )
  }
}

const customStyles = {
  content: {
    width: '40%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export default connect(null)(SignInModal)
