import React from 'react'
import Modal from 'react-modal'
import facebook from '../../images/facebook.svg'
import google from '../../images/google.png'
import github from '../../images/github.png'

Modal.setAppElement('#root')

class SiginModal extends React.Component {
  render () {
    return (
      <Modal
        isOpen={false}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Sign in modal">
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

export default SiginModal
