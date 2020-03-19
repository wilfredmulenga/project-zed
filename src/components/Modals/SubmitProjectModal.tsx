import React, { FormEvent } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import firebase from '../../config/firebase'

import ChipInput from 'material-ui-chip-input'
import { toggleSubmitProjectModal } from '../../actions/actionCreators'
import { Home, Dispatch, HomeReducer } from '../../types/types'

type Props = {
  home: Home,
  isOpen: boolean,
  dispatch: Dispatch
}

Modal.setAppElement('#root')

const chipsPlaceholderValues = ['javascript', 'css']

class SumbitProjectModal extends React.Component<Props> {
    state = {
      projectOwner: '',
      tools: chipsPlaceholderValues,
      description: '',
      typeOfProject: 'Open Source',
      link: '',
      likes: 0,
      loading: false,
      responseMessage: '',
      submitted: false,
      projectId: '',
      likedBy: ['0'] // firebase does not allow empty arrays
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

  onFormSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    this.setState({
      loading: true,
      submitted: true
    })
    const { projectOwner, tools, description, typeOfProject, link, likes, likedBy } = this.state
    const { userUID } = this.props.home
    const newProjectKey = firebase.database().ref().child(userUID).push().key
    firebase.database().ref(`users/${userUID}/projects/${newProjectKey}/`).set({
      projectOwner,
      tools,
      description,
      typeOfProject,
      link,
      likes,
      likedBy,
      projectId: newProjectKey
    }).then((error) => {
      if (error) {
        this.setState({
          loading: false,
          responseMessage: error
        })
      } else {
        this.setState({
          loading: false,
          responseMessage: "You're project has successfully been submitted!"
        })
      }
    })
  }

  renderForm = () => {
    const { projectOwner, description, link, typeOfProject, responseMessage } = this.state
    if (responseMessage) {
      return (<div className="response-message-container">
        <p>{responseMessage}</p>
        <div className="modal-button-container">
          <button
            onClick={() => this.props.dispatch(toggleSubmitProjectModal())}
            type="button"
            className="btn btn-outline-danger">
            Close
          </button>
        </div>
      </div>)
    }
    return (
      <form onSubmit={this.onFormSubmit}>
        <h3>Share your project with the community</h3>
        <hr/>
        <div className="inputField">
          <label>project owner</label>
          <input
            placeholder="project owner"
            type="text"
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
            type="text"
            value={link}
            onChange={(evt) => this.handleInput('link', evt.target.value)}
            required
          />
        </div>
        <div className="modal-button-container">
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
    )
  }

  render () {
    const { isOpen } = this.props
    const { loading } = this.state

    return (
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="submit project modal">
        {
          loading
            ? <Loader darkSpinner={true} />
            : this.renderForm()
        }
      </Modal>
    )
  }
}

const customStyles = {
  content: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
    minHeight: '40%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

function mapStateToProps ({ homeReducer }: { homeReducer: HomeReducer }) {
  return {
    home: homeReducer
  }
}

export default connect(mapStateToProps, null)(SumbitProjectModal)
