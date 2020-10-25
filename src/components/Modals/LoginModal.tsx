import React, { useState, useContext } from 'react'
import { Context as AuthContext } from '../../config/authContext'
import Modal from 'react-modal'
import firebase from '../../config/firebase'
import facebook from '../../images/facebook.svg'
import google from '../../images/google.png'
import github from '../../images/github.png'
import twitter from '../../images/twitter.png'

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

const LoginModal = ({ loggedIn }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { state, loginUser, closeLoginModal, logoutUser } = useContext(AuthContext)

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
      case 'Twitter':
        authProvider = new firebase.auth.TwitterAuthProvider()
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
      const { uid } = result.user
      if (uid) {
        setSuccessMessage('Sigin in successfully')
        setTimeout(() => {
          loginUser(uid)
          return closeLoginModal()
        }, 2000)
      } else {
        // show error message and ask them to sign in annonymously
        return setErrorMessage('We are unable to log you in with the given provider. Please try log in anonymously.')
      }
    }
  }

  const handleAnonymousAuthentication = () => {
    firebase.auth().signInAnonymously().catch(function (error) {
      // Handle Errors here.
      const errorMessage = error.message
      // ...
      console.log(errorMessage)
      return setErrorMessage('Failed to log in anonymously.')
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.uid) {
        setSuccessMessage('Sigin in successfully')
        setTimeout(() => {
          loginUser(user.uid)
          closeLoginModal()
        }, 2000)
      } else {
        return setErrorMessage('Failed to log in anonymously.')
      }
    })
  }

  const LogoutContent = () => (
    <div className='sign-out-modal'>
      <h3>Sign Out ?</h3>
      <hr/>
      <div className='sign-out-modal'>
        <button
          onClick={() => logoutUser(state.userUID)}
          type="button"
          className="btn btn-outline-danger sign-out-modal-yes">
        Yes
        </button>
        <button
          onClick={() => closeLoginModal()}
          type="button"
          className="btn btn-outline-danger sign-out-modal-no">
        No
        </button>
      </div>
    </div>
  )

  const LoginContent = () => (
    <div className='sign-in-modal'>
      <h3>Sign In</h3>
      <hr/>
      <div
        className='social-signin-button google'
        onClick={() => authenticate('Google')}
      >
        <img src={google} alt='google icon' />
        <p>Google</p>
      </div>
      <div
        className='social-signin-button google'
        onClick={() => authenticate('Twitter')}
      >
        <img src={twitter} alt='twitter icon' />
        <p>Twitter</p>
      </div>
      <div
        className='social-signin-button github'
        onClick={() => authenticate('Github')}
      >
        <img src={github} alt='github icon' />
        <p>Github</p>
      </div>
      <div
        className='social-signin-button github'
        onClick={() => handleAnonymousAuthentication()}
      >
        <p>Stay Anonymous</p>
      </div>
      <div>
        <>
          { errorMessage && <p className='error-message'>{errorMessage}</p> }
          { successMessage && <p className="response-message">{successMessage}</p> }
        </>
      </div>
      <div className='modalCloseButton'>
        <button
          onClick={() => closeLoginModal()}
          type="button"
          className="btn btn-outline-danger">
          Close
        </button>
      </div>
    </div>
  )

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
