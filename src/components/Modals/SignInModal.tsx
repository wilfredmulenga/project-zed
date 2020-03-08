import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import firebase from '../../config/firebase'
import { toggleSignInModal, logInStateChange } from '../../actions/actionCreators'
import { Dispatch } from '../../types/types'
import facebook from '../../images/facebook.svg'
import google from '../../images/google.png'
import github from '../../images/github.png'

type Props = {
  isOpen: boolean,
  dispatch: Dispatch
}

type State = {
  errorMessage: string
}

Modal.setAppElement('#root')

class SignInModal extends React.Component<Props, State> {
  state: State = {
    errorMessage: ''
  }

  componentDidUpdate (props: Props) {
    this.setState({ errorMessage: '' })
  }

  updateErrorMessage = (methods: string[]) => {
    this.setState({
      errorMessage: `You previously signed up using ${methods[0]}. Please select this sign in provider to sign in`
    }, () => {
      this.props.dispatch(toggleSignInModal)
    })
  }

   authenticationProvider = (provider: string) => {
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

  authenticate = async (provider: string) => {
    this.props.dispatch(toggleSignInModal())
    try {
      await firebase.auth().signInWithPopup(this.authenticationProvider(provider))
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.email
        const methods = await firebase.auth().fetchSignInMethodsForEmail(email)
        this.updateErrorMessage(methods)
      }
    }

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

  render () {
    const { isOpen } = this.props
    const { errorMessage } = this.state
    return (

      <Modal
        isOpen={isOpen || !!errorMessage}
        style={customStyles}
        contentLabel="Sign in modal">
        <div className='sign-in-modal'>
          <h3>Sign In</h3>
          <hr/>
          {
            <div className='error-message'>{errorMessage}</div>
          }
          <div className='social-signin-button facebook' onClick={() => this.authenticate('Facebook')}>
            <img src={facebook} alt='facebook icon' />
            <p>Facebook</p>
          </div>
          <div className='social-signin-button google' onClick={() => this.authenticate('Google')}>
            <img src={google} alt='google icon' />
            <p>Google</p>
          </div>
          <div className='social-signin-button github' onClick={() => this.authenticate('Github')}>
            <img src={github} alt='github icon' />
            <p>Github</p>
          </div>
        </div>
        <div className='modalCloseButton'>
          <button
            onClick={() => this.props.dispatch(toggleSignInModal())}
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
