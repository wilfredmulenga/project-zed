import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { addProject } from '../actions/actionCreators'
import ChipInput from 'material-ui-chip-input'
import TransitionsModal from './Modals/TransitionsModal'
import '../styles/SubmitProject.scss'

const initialState = {
  projectOwner: '',
  skills: ['javascript', 'css'],
  description: '',
  typeOfProject: '',
  link: '',
  likes: 0
}

const SubmitProject = (props) => {
  const [state, setState] = useState(initialState)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalText, setModalText] = useState('')
  const handleTypeOfProjectChange = (typeOfProject) => {
    setState(prevState => ({ ...prevState, typeOfProject }))
  }

  const handleInputChange = (evt) => {
    const { id, value } = evt.target
    setState(state => ({ ...state, [id]: value }))
  }

  const handleToolsChange = (skills) => {
    setState(prevState => ({ ...prevState, skills }))
  }

  const onFormSubmit = async (evt) => {
    evt.preventDefault()
    const result = await addProject({ project: state })
    if (result) {
      setModalOpen(true)
      setModalText('You\'re project has been submitted.')
    } else {
      setModalText('An error occurred. Please try again later.')
      setModalOpen(true)
    }

    setTimeout(() => {
      handleModalClose()
    }, 2500);
  }

  const handleModalClose = () => {
    setModalOpen(false)
    props.history.push('/')
  }

  const { projectOwner, description, typeOfProject, link, skills } = state

  return (
    <div>
      <Navbar />
      <div className="submit-project-container">
        <div className="form-container">
          <form onSubmit={onFormSubmit}>
            <h3>Share your project with the community</h3>
            <hr/>
            <div className="inputField">
              <label>Project owner</label>
              <input
                id="projectOwner"
                className="project-owner"
                placeholder="project owner"
                type="text"
                value={projectOwner}
                onChange={(evt) => handleInputChange(evt)}
                required
              />
            </div>
            <div className="inputField">
              <label>Tools used</label>
              <ChipInput
                id="skillsInputField"
                defaultValue={skills}
                onChange={(skills) => handleToolsChange(skills)}
              />
            </div>
            <div className="inputField">
              <label>Description</label>
              <textarea
                placeholder="description"
                value={description}
                rows={3}
                id="description"
                onChange={(evt) => handleInputChange(evt)}
                required
              />
            </div>
            <p>Type of project</p>
            <div>
              <input
                type="radio"
                id="typeOfProject"
                name="type-of-project"
                value="Open Source"
                checked={typeOfProject === 'Open Source' }
                onChange={(evt) => handleInputChange(evt) }
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
                onChange={(evt) => handleTypeOfProjectChange(evt.target.value) }
              />
              <label htmlFor="Closed Source">Closed Source</label>
            </div>
            <div className="inputField">
              <label>Link to project</label>
              <input
                placeholder="link"
                type="text"
                value={link}
                id="link"
                className="link"
                onChange={(evt) => handleInputChange(evt)}
                required
              />
            </div>
            <div className="modal-button-container">
              <button
                type="submit"
                className="btn btn-outline-info">
            Submit
              </button>
            </div>
          </form>
        </div>
        <TransitionsModal
          isOpen={isModalOpen}
          title={modalText}
          handleClose={() => handleModalClose()}
        />
      </div>
    </div>
  )
}

export default SubmitProject
