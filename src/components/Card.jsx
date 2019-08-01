import React from 'react'
import { connect } from 'react-redux'
import { likeProject } from '../actions/actionCreators'

const whiteBackground = {
  backgroundColor: '#FFF'
}

class Card extends React.Component {
  state = {
    liked: false
  }

  handleCick = (liked, index) => {
    this.props.dispatch(likeProject(liked, index))
    this.setState({ liked: !liked })
  }

  render () {
    const { index, project } = this.props
    const { liked } = this.state
    return (
      <div key={index} className="row justify-content-center">
        <div className="col-md-8 col-sm-8 mb-4">
          <div>
            <div className="card-body row" style={whiteBackground}>
              <div className="col-5">
                <p style={{ display: 'inline', marginBottom: 20 }} className="card-title">{project.githubUsername}</p>
                <p>
              Tools:
                  {' '}
                  {project.tools.map((element, i) => (<span key={i} className="card-subtitle mr-1">{element}</span>))}
                </p>
                <p>{project.type}</p>
                <p>Likes: {project.likes}</p>
              </div>
              <div className="col-7">
                <p style={{ display: 'inline', marginBottom: 20 }}>{project.description}</p>
                <p>
                  {' '}
              Link:
                  {' '}
                  <a rel="noopener noreferrer" target="_blank" href={project.link}>{project.link}</a>
                  {' '}
                </p>
              </div>
              <div>
                <button className={`btn btn-primary ${liked ? `active` : null}`}
                  onClick={this.handleCick.bind(null, liked, index)}>
                  Upvote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Card)
