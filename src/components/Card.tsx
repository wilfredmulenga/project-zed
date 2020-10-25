import React, { useContext } from 'react'
import { Context as AuthContext } from '../config/authContext'
import { Context as ProjectContext } from '../config/projectContext'

const Card = ({ project, index }) => {
  const { state: { loggedIn, userUID }, openLoginModal } = useContext(AuthContext)
  const { likeProject, unlikeProject } = useContext(ProjectContext)

  const handleClick = () => {
    const { likedBy } = project
    if (loggedIn) {
      if (likedBy.includes(userUID)) {
        unlikeProject(index, userUID)
      } else {
        likeProject(index, userUID)
      }
    } else {
      openLoginModal()
    }
  }
  const { projectId, skills, type, likes, description, likedBy, projectOwner, link } = project
  return (
    <div key={projectId} className="row justify-content-center">
      <div className="col-md-8 col-sm-8 mb-4">
        <div>
          <div className="card-body row" style={{ backgroundColor: '#FFF' }}>
            <div className="col-5">
              <p
                style={{ display: 'inline', marginBottom: 20 }}
                className="card-title">
                {projectOwner}
              </p>
              <p>
              skills:
                {' '}
                {skills && skills.map((element, i) =>
                  (<span key={i} className="card-subtitle mr-1">{element}</span>))}
              </p>

              <p>{type}</p>
              <div className="like-container">
                <div
                  className="like"
                  onClick={() => handleClick()}
                >
                  <p>{likedBy && likedBy.includes(userUID) ? 'unlike' : 'like' }</p>
                </div>
                <div className="like-count">{likes}</div>
              </div>
            </div>
            <div className="col-7">
              <p
                className="remove-overflow-text"
                style={{ display: 'inline', marginBottom: 20 }}>
                {description}
              </p>
              <p>
                {' '}
              Link:
                {' '}
                <a
                  className="remove-overflow-text"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={link}>
                  {link}
                </a>
                {' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
