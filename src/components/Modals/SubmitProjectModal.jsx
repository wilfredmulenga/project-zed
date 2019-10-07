// @flow

import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import firebase from '../../config/firebase'
import { toggleSignInModal, logInStateChange } from '../../actions/actionCreators'

Modal.setAppElement('#root')

class SumbitProjectModal extends React.Component {
  render () {
    const { isOpen } = this.props
    return (

      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="Sign in modal"
        onClick={() => console.log('modal clicked')}>
        <div className='SubmitProjectModal'>
          <h3>Share your project with the community</h3>
          <hr/>
          <input
            placeholder="Project owner"
            type='text'
            // value={projectOwner}
            onChange={(e) => this.handleInput('projectOwner', e.target.value)}
            required
          />
          <input
            placeholder="tools used"
            type='text'
            // value={projectOwner}
            onChange={(e) => this.handleInput('projectOwner', e.target.value)}
            required
          />
          <input
            placeholder="description"
            type='text'
            // value={projectOwner}
            onChange={(e) => this.handleInput('description', e.target.value)}
            required
          />
          <input
            placeholder="link to project"
            type='text'
            // value={projectOwner}
            onChange={(e) => this.handleInput('link', e.target.value)}
            required
          />
          <div className='modalCloseButton'>
            <button
              onClick={() => this.props.dispatch(toggleSignInModal())}
              type="button"
              className="btn btn-outline-danger">
            Close
            </button>
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

export default connect(null)(SumbitProjectModal)
