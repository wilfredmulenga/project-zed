// @flow

import React from 'react'
import { connect } from 'react-redux'
import { likeOrDislike, toggleSignInModal } from '../actions/actionCreators'
import { Home, Project } from '../types/types'

const whiteBackground = {
  backgroundColor: '#FFF'
}

type Props = {
  home: Home,
  dispatch: (any) => void,
  index: number,
  project: Project
}

type State = {
  liked: boolean
}

class Card extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      liked: false
    }
  }

  handleCick = (projectId, index) => {
    const { loggedIn, userUID } = this.props.home
    if (loggedIn) {
      this.setState(state => ({ liked: !state.liked }),
        () => this.props.dispatch(likeOrDislike(projectId, userUID, this.state.liked, index)))
    } else {
      this.props.dispatch(toggleSignInModal())
    }
  }

  render () {
    const { project, project: { projectId }, index } = this.props
    const { liked } = this.state
    return (
      <div key={projectId} className="row justify-content-center">
        <div className="col-md-8 col-sm-8 mb-4">
          <div>
            <div className="card-body row" style={whiteBackground}>
              <div className="col-5">
                <p style={{ display: 'inline', marginBottom: 20 }} className="card-title">{project.projectOwner}</p>
                <p>
              Tools:
                  {' '}
                  {project.tools.map((element, i) => (<span key={i} className="card-subtitle mr-1">{element}</span>))}
                </p>
                <p>{project.type}</p>
                <div className='likeContainer'>
                  <div className="like" onClick={() => this.handleCick(projectId, index)}><p>{liked ? 'unlike' : 'like' }</p></div>
                  <div className='likeCount'>{project.likes}</div>
                </div>
              </div>
              <div className="col-7">
                <p className='removeOverflowText' style={{ display: 'inline', marginBottom: 20 }}>{project.description}</p>
                <p>
                  {' '}
              Link:
                  {' '}
                  <a className='removeOverflowText' rel="noopener noreferrer" target="_blank" href={project.link}>{project.link}</a>
                  {' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ homeReducer }) {
  return {
    home: homeReducer
  }
}

export default connect(mapStateToProps, null)(Card)
