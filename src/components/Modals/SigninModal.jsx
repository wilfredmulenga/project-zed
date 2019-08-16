import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { toggleSigninModal } from '../../actions/actionCreators'
import facebook from '../../images/facebook.svg'
import google from '../../images/google.png'
import github from '../../images/github.png'

Modal.setAppElement('#root')

class SiginModal extends React.Component {
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

export default connect(null)(SiginModal)
