import React from 'react'
import { connect } from 'react-redux'
import { likeOrDislike, toggleSignInModal } from '../actions/actionCreators'
import { Home, Project, HomeReducer } from '../types/types'

const whiteBackground = {
  backgroundColor: '#FFF'
}

type Props = {
  home: Home,
  // dispatch: () => void,
  index: number,
  project: Project
}

// TODO: stop using dispatch
class Card extends React.Component<Props> {
  handleClick = (projectId: string, index: number): void => {
    const { home: { loggedIn, userUID }, project, project: { userUID: projectUserUID } } = this.props

    if (loggedIn) {
      // dispatch(likeOrDislike(projectId, projectUserUID, userUID, !project.likedBy.includes(userUID), index))
    } else {
      // dispatch(toggleSignInModal())
    }
  }

  render () {
    const { project: { projectId, likes, projectOwner, description, tools, link, likedBy, type },
      index, home: { userUID } } = this.props
    return (
      <div key={projectId} className="row justify-content-center">
        <div className="col-md-8 col-sm-8 mb-4">
          <div>
            <div className="card-body row" style={whiteBackground}>
              <div className="col-5">
                <p style={{ display: 'inline', marginBottom: 20 }} className="card-title">{projectOwner}</p>
                <p>
              Tools:
                  {' '}
                  {tools.map((element, i) => (<span key={i} className="card-subtitle mr-1">{element}</span>))}
                </p>

                <p>{type}</p>
                <div className="like-container">
                  <div className="like" onClick={() => this.handleClick(projectId, index)}><p>{likedBy.includes(userUID) ? 'unlike' : 'like' }</p></div>
                  <div className="like-count">{likes}</div>
                </div>
              </div>
              <div className="col-7">
                <p className="remove-overflow-text" style={{ display: 'inline', marginBottom: 20 }}>{description}</p>
                <p>
                  {' '}
              Link:
                  {' '}
                  <a className="remove-overflow-text" rel="noopener noreferrer" target="_blank" href={link}>{link}</a>
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

function mapStateToProps ({ homeReducer }: { homeReducer: HomeReducer }) {
  return {
    home: homeReducer
  }
}

export default connect(mapStateToProps, null)(Card)