// @flow

import * as React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import firebase from '../../config/firebase'
import ChipInput from 'material-ui-chip-input'
import { toggleSubmitProjectModal } from '../../actions/actionCreators'
import '../../App.scss'

type Props = {
  isOpen: boolean,
  dispatch: (any) => void
}

type State = {
  projectOwner: string,
  tools: Array<string>,
  description: string,
  typeOfProject: string,
  link: string
}

Modal.setAppElement('#root')

const chipsPlaceholderValues = ['javascript', 'css']

class SumbitProjectModal extends React.Component<Props, State> {
    state = {
      projectOwner: '',
      tools: chipsPlaceholderValues,
      description: '',
      typeOfProject: 'Open Source',
      link: ''
    }

  handleInput = (field: string, value: string) => {
    this.setState({
      [field]: value
    })
  }

  handleToolsChange = (value: Array<string>) => {
    this.setState(state => ({
      ...state,
      tools: value
    }))
  }

  handleTypeOfProjectChange = (typeOfProject: string) => {
    this.setState(state => ({
      ...state,
      typeOfProject
    }))
  }

  onFormSubmit = (evt) => {
    evt.preventDefault()
    const { projectOwner, tools, description, typeOfProject, link } = this.state
    firebase.database().ref('projects/').set({
      projectOwner,
      tools,
      description,
      typeOfProject,
      link
    })
  }

  render () {
    const { isOpen } = this.props
    const { projectOwner, description, link, typeOfProject } = this.state
    return (
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="submit project modal">
        <div className='submitProjectModal'>
          <form onSubmit={this.onFormSubmit}>
            <h3>Share your project with the community</h3>
            <hr/>
            <div className="inputField">
              <label>project owner</label>
              <input
                placeholder="project owner"
                type='text'
                value={projectOwner}
                onChange={(evt) => this.handleInput('projectOwner', evt.target.value)}
                required
              />
            </div>
            <div className="inputField">
              <label>tools used</label>
              <ChipInput
                defaultValue={chipsPlaceholderValues}
                onChange={(tools) => this.handleToolsChange(tools)}
              />
            </div>
            <div className="inputField">
              <label>description</label>
              <textarea
                placeholder="description"
                type='text'
                value={description}
                rows={3}
                onChange={(evt) => this.handleInput('description', evt.target.value)}
                required
              />
            </div>
            <p>type of project</p>
            <div>
              <input
                type="radio"
                id="Open Source"
                name="type-of-project"
                value="Open Source"
                checked={typeOfProject === 'Open Source' }
                onChange={(evt) => this.handleTypeOfProjectChange(evt.target.value) }
              />
              <label htmlFor="Open Source">Open Source</label>
            </div>
            <div>
              <input
                type="radio"
                id="Closed Source"
                name="type-of-project"
                value="Closed Source"
                checked={typeOfProject === 'Closed Source' }
                onChange={(evt) => this.handleTypeOfProjectChange(evt.target.value) }
              />
              <label htmlFor="Closed Source">Closed Source</label>
            </div>
            <div className="inputField">
              <label>link to projects</label>
              <input
                placeholder="link"
                type='text'
                value={link}
                onChange={(evt) => this.handleInput('link', evt.target.value)}
                required
              />
            </div>
            <div className='modal-button-container'>
              <button
                onClick={() => this.props.dispatch(toggleSubmitProjectModal())}
                type="button"
                className="btn btn-outline-danger">
            Close
              </button>
              <button
                type="submit"
                className="btn btn-outline-info">
            Submit
              </button>
            </div>
          </form>
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
