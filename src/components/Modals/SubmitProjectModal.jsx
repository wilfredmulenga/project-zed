// @flow

import * as React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import ChipInput from 'material-ui-chip-input'
// import firebase from '../../config/firebase'
import { toggleSignInModal, logInStateChange, toggleSubmitProjectModal } from '../../actions/actionCreators'
import '../../App.scss'

type Props = {
  isOpen: boolean
}

type State = {
  projectOwner: string,
  tools: Array<string>,
  description: string,
  link: string
}

Modal.setAppElement('#root')

class SumbitProjectModal extends React.Component<Props, State> {
    state = {
      projectOwner: '',
      tools: [],
      description: '',
      link: '',
      chips: ''
    }

  handleInput = (field: string, value: string) => {
    this.setState({ [field]: value })
  }

  render () {
    const { isOpen } = this.props
    const { projectOwner, tools, description, link } = this.state
    return (
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="submit project modal">
        <div className='submitProjectModal'>
          <h3>Share your project with the community</h3>
          <hr/>
          <div className="inputField">
            <label>project owner</label>
            <input
              placeholder="project owner"
              type='text'
              value={projectOwner}
              onChange={(e) => this.handleInput('projectOwner', e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>tools used</label>
            <ChipInput
              defaultValue={['javascript', 'css']}
              onChange={(chips) => this.handleInput(chips)}
            />
            <input
              placeholder="tools"
              type='text'
              value={tools}
              onChange={(e) => this.handleInput('tools', e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>description</label>
            <textarea
              placeholder="description"
              type='text'
              value={description}
              onChange={(e) => this.handleInput('description', e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>link to projects</label>
            <input
              placeholder="link"
              type='text'
              value={link}
              onChange={(e) => this.handleInput('link', e.target.value)}
              required
            />
          </div>
          <div className='modalCloseButton'>
            <button
              onClick={() => this.props.dispatch(toggleSubmitProjectModal())}
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
