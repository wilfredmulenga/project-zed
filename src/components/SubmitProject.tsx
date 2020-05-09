import React, { useState } from 'react'
import ChipInput from 'material-ui-chip-input'

const initialState = {
  projectOwner: '',
  tools: [],
  description: '',
  typeOfProject: '',
  link: ''
}

const SubmitProject = () => {
  const [state, setState] = useState(initialState)
  const chipsPlaceholderValues = ['javascript', 'css']

  const handleTypeOfProjectChange = (typeOfProject) => {
    // this.setState(state => ({
    //   ...state,
    //   typeOfProject
    // }))
  }

  const handleToolsChange = (tools) => {}

  const onFormSubmit = () => {}
  const { projectOwner, tools, description, typeOfProject, link } = state

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h3>Share your project with the community</h3>
        <hr/>
        <div className="inputField">
          <label>project owner</label>
          <input
            placeholder="project owner"
            type="text"
            value={projectOwner}
            // onChange={(evt) => handleInput('projectOwner', evt.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <label>tools used</label>
          <ChipInput
            defaultValue={chipsPlaceholderValues}
            onChange={(tools) => handleToolsChange(tools)}
          />
        </div>
        <div className="inputField">
          <label>description</label>
          <textarea
            placeholder="description"
            value={description}
            rows={3}
            // onChange={(evt) => this.handleInput('description', evt.target.value)}
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
          <label>link to projects</label>
          <input
            placeholder="link"
            type="text"
            value={link}
            // onChange={(evt) => this.handleInput('link', evt.target.value)}
            required
          />
        </div>
        <div className="modal-button-container">
          <button
            // onClick={() => this.props.dispatch(toggleSubmitProjectModal())}
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
  )
}

export default SubmitProject
