import React, { useState, useContext } from 'react'
import { Context as AuthContext } from '../../config/authContext'
import Modal from 'react-modal'
import firebase from '../../config/firebase'
import facebook from '../../images/facebook.svg'
import google from '../../images/google.png'
import github from '../../images/github.png'

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

Modal.setAppElement('#root')

const LoginModal = ({ loggedIn, handleModalClose }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const { state, loginUser, logoutUser, closeLoginModal } = useContext(AuthContext)

  const authenticationProvider = (provider: string) => {
    let authProvider
    switch (provider) {
      case 'Facebook':
        authProvider = new firebase.auth.FacebookAuthProvider()
        break
      case 'Google':
        authProvider = new firebase.auth.GoogleAuthProvider()
        break
      case 'Github':
        authProvider = new firebase.auth.GithubAuthProvider()
        break
      default:
        authProvider = new firebase.auth.GoogleAuthProvider()
    }
    return authProvider
  }

  const updateErrorMessage = (methods: string[]) => {
    setErrorMessage(`You previously signed up using ${methods[0]}. Please select this sign in provider to sign in`)
  }

  const authenticate = async (provider: string) => {
    let result
    try {
      result = await firebase.auth().signInWithPopup(authenticationProvider(provider))
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.email
        const methods = await firebase.auth().fetchSignInMethodsForEmail(email)
        updateErrorMessage(methods)
      }
    }
    if (result) {
      // login user
      loginUser()
      closeLoginModal()
    } else {
      // show error message and ask them to sign in annonymously
      setErrorMessage('We are unable to log you in with the given provider. Please try log in annonymously.')
    }
  }

  const LogoutContent = () =>
    <div className='sign-out-modal'>
      <h3>Sign Out ?</h3>
      <hr/>
      <div className='sign-out-modal'>
        <button
          // onClick={this.signOut}
          type="button"
          className="btn btn-outline-danger sign-out-modal-yes">
        Yes
        </button>
        <button
          // onClick={() => this.props.dispatch(toggleSignOutModal())}
          type="button"
          className="btn btn-outline-danger sign-out-modal-no">
        No
        </button>
      </div>
    </div>

  const LoginContent = () => (
    <div className='sign-in-modal'>
      <h3>Sign In</h3>
      <hr/>
      {
        <div className='error-message'>{errorMessage}</div>
      }
      {/* <div
        className='social-signin-button facebook'
        onClick={() => authenticate('Facebook')}
      >
        <img src={facebook} alt='facebook icon' />
        <p>Facebook</p>
      </div>
      <div
        className='social-signin-button google'
        onClick={() => authenticate('Google')}
      >
        <img src={google} alt='google icon' />
        <p>Google</p>
      </div> */}
      <div
        className='social-signin-button github'
        onClick={() => authenticate('Github')}
      >
        <img src={github} alt='github icon' />
        <p>Github</p>
      </div>
      <div className='modalCloseButton'>
        <button
          onClick={() => handleModalClose()}
          type="button"
          className="btn btn-outline-danger">
          Close
        </button>
      </div>
    </div>
  )

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       const userInfo = { userUID: user.uid, loggedIn: true }
  //       localStorage.setItem('userInfo', JSON.stringify(userInfo))
  //       this.props.dispatch(logInStateChange(userInfo))
  //     } else {
  //       localStorage.removeItem('userInfo')
  //       this.props.dispatch(logInStateChange({ userUID: '', loggedIn: false }))
  //     }
  //   })
  // }
  return (
    <Modal
      isOpen={true || !!errorMessage}
      style={customStyles}>
      {
        loggedIn
          ? <LogoutContent />
          : <LoginContent />
      }
    </Modal>
  )
}

export default LoginModal
