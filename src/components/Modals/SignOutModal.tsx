import React from 'react'
import Modal from 'react-modal'
import firebase from '../../config/firebase'
import { toggleSignOutModal, logInStateChange } from '../../actions/actionCreators'

type Props = {
  isOpen: boolean,
  loggedIn: boolean,
  dispatch: (arg0: any) => void
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

Modal.setAppElement('#root')

class SignOutModal extends React.Component<Props> {
  signOut = (): void => {
    firebase.auth().signOut()
    localStorage.removeItem('userInfo')
    this.props.dispatch(logInStateChange({ userUID: '', loggedIn: false }))
    this.props.dispatch(toggleSignOutModal())
  }

  render () {
    const { isOpen, loggedIn } = this.props
    return (
      <div></div>
    )
  }
}

export default SignOutModal
