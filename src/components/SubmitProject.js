import React, { useState } from 'react'
import { addProject } from '../actions/actionCreators'
import ChipInput from 'material-ui-chip-input'
import '../styles/SubmitProject.scss'

const initialState = {
  projectOwner: '',
  skills: [],
  description: '',
  typeOfProject: '',
  link: ''
}

const SubmitProject = () => {
  const [state, setState] = useState(initialState)
  const chipsPlaceholderSkills = ['javascript', 'css']

  const handleTypeOfProjectChange = (typeOfProject) => {
    // this.setState(state => ({
    //   ...state,
    //   typeOfProject
    // }))
  }

  const handleInputChange = (evt) => {
    const { id, value } = evt.target
    setState(state => ({ ...state, [id]: value }))
  }

  const handleToolsChange = (skills) => {
    setState(prevState => ({ ...prevState, skills }))
  }

  const onFormSubmit = () => {
    return console.log('here', state)
  }
  const { projectOwner, skills, description, typeOfProject, link } = state

  return (
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
              onChange={(evt, text) => handleInputChange(evt)}
              required
            />
          </div>
          <div className="inputField">
            <label>Tools used</label>
            <ChipInput
              id="skillsInputField"
              defaultValue={chipsPlaceholderSkills}
              onChange={(skills) => handleToolsChange(skills)}
            />
          </div>
          <div className="inputField">
            <label>Description</label>
            <textarea
              placeholder="description"
              value={description}
              rows={3}
              // onChange={(evt) => this.handleInput('description', evt.target.value)}
              required
            />
          </div>
          <p>Type of project</p>
          <div>
            <input
              type="radio"
              id="Open Source"
              name="type-of-project"
              value="Open Source"
              checked={typeOfProject === 'Open Source' }
              onChange={(evt) => handleTypeOfProjectChange(evt.target.value) }
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
              className="link"
              // onChange={(evt) => this.handleInput('link', evt.target.value)}
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
    </div>
  )
}

export default SubmitProject
